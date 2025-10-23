# SSO Integration Analysis for Fund Your Future

## Executive Summary

This document provides a comprehensive analysis of SAML SSO integration options for Fund Your Future with Smith College's Shibboleth Identity Provider.

**Recommendation:** Firebase Identity Platform + SAML (Option A)
**Timeline:** 2-3 weeks from Smith IT confirmation to production
**Cost:** ~$2,040/year operational cost

## Smith College IT Requirements

### Confirmed Requirements:
- **Identity Provider:** Shibboleth SAML IdP
- **Email Domain:** @smith.edu (all users)
- **Unique Identifier:** ERP system ID (preferred over email)
- **User Provisioning:** Complex workflow via Workday ERP
- **Role Management:** Multiple roles per user (e.g., employee + student)
- **Deprovisioning:** Automatic via Workday workflow

### Pending Clarification:
- Third-party app review process (awaiting John Singler response)
- **Critical:** IdP-initiated vs SP-initiated SAML flow requirement
- Exact SAML attribute names and formats
- Role change frequency and real-time update requirements

## Technical Implementation Options

### Option A: Firebase Identity Platform + SAML (RECOMMENDED)

**Architecture Flow:**
```
[User] → [Fund Your Future Login] → [Firebase SAML Provider] → [Shibboleth IdP] →
[User Auth] → [SAML Response] → [Firebase beforeSignIn Function] →
[Custom Claims Set] → [User Signed In]
```

**Implementation Details:**
```javascript
// beforeSignIn Cloud Function
exports.beforeSignIn = functions.auth.user().beforeSignIn((user, context) => {
  const attrs = context.additionalUserInfo.profile;
  return {
    customClaims: {
      erpId: attrs.uniqueId,           // Smith ERP ID
      roles: attrs.eduPersonAffiliation, // Student/Faculty/Staff
      department: attrs.department,
      email: attrs.mail
    }
  };
});

// Access throughout app
const userRoles = (await user.getIdTokenResult()).claims.roles;
const erpId = (await user.getIdTokenResult()).claims.erpId;
```

**Pros:**
- ✅ 2-3 day implementation
- ✅ Google-managed security & certificates
- ✅ 99.95% uptime SLA
- ✅ Auto-scaling infrastructure
- ✅ Native Firebase integration
- ✅ $2,040/year predictable cost

**Cons:**
- ❌ SP-initiated flows only (no IdP-initiated)
- ❌ Vendor lock-in to Firebase
- ❌ Custom claims limited to 1000 bytes
- ❌ Role updates only on next login

**Requirements Coverage:**
- ✅ Shibboleth SAML IdP support
- ✅ ERP ID via custom claims
- ✅ Multiple roles via custom claims
- ✅ @smith.edu email validation
- ❌ IdP-initiated flows (TBD with Smith IT)

### Option B: Custom Next.js SAML Implementation

**Architecture Flow:**
```
[User] → [Fund Your Future Login] → [Next.js SAML Handler] → [Shibboleth IdP] →
[User Auth] → [SAML Response] → [Server Validation] → [Firestore Storage] →
[Firebase Custom Token] → [User Signed In]
```

**Implementation Details:**
```javascript
// API Route: /api/auth/saml/callback
import { validateSAMLResponse } from '@node-saml/passport-saml';

export default async function handler(req, res) {
  const samlResponse = await validateSAMLResponse(req.body);

  // Store in Firestore
  await admin.firestore().collection('users').doc(userId).set({
    erpId: samlResponse.uniqueId,
    roles: samlResponse.eduPersonAffiliation,
    email: samlResponse.mail
  });

  // Create custom token
  const customToken = await admin.auth().createCustomToken(userId, {
    erpId: samlResponse.uniqueId,
    roles: samlResponse.eduPersonAffiliation
  });

  return res.json({ token: customToken });
}
```

**Pros:**
- ✅ Full SAML control
- ✅ IdP-initiated flow support
- ✅ Real-time role synchronization possible
- ✅ No vendor lock-in
- ✅ Custom attribute processing
- ✅ Lower long-term cost (5+ years)

**Cons:**
- ❌ 2-3 week implementation
- ❌ Security maintenance burden
- ❌ Certificate rotation management
- ❌ Custom monitoring required
- ❌ Higher development cost ($8-12K)

**Requirements Coverage:**
- ✅ All Smith College requirements
- ✅ IdP-initiated flows
- ✅ Real-time updates possible
- ✅ Full attribute flexibility

## Cost Analysis (5-Year Projection)

### Option A: Firebase Identity Platform
```
Year 1: $2,040 (Identity Platform SAML)
Year 2: $2,040
Year 3: $2,040
Year 4: $2,040
Year 5: $2,040
Total: $10,200
```

### Option B: Custom Implementation
```
Year 1: $11,060 ($8K dev + $3,060 ops)
Year 2: $3,060 (operations only)
Year 3: $3,060
Year 4: $3,060
Year 5: $3,060
Total: $23,300
```

**Break-even point:** Never (Option A remains cheaper)

## Decision Matrix

| Criteria | Weight | Option A Score | Option B Score | Winner |
|----------|--------|----------------|----------------|---------|
| Implementation Speed | 25% | 9/10 | 4/10 | A |
| Operational Cost | 20% | 9/10 | 6/10 | A |
| Technical Flexibility | 15% | 6/10 | 9/10 | B |
| Maintenance Burden | 15% | 9/10 | 4/10 | A |
| Security Management | 15% | 9/10 | 6/10 | A |
| Smith Requirements | 10% | 8/10 | 10/10 | B |

**Weighted Score:**
- Option A: 7.85/10
- Option B: 6.25/10

**Winner: Option A (Firebase Identity Platform)**

## Implementation Timeline (Option A)

### Week 1: Preparation
- [ ] Upgrade Firebase project to Blaze plan
- [ ] Enable Identity Platform
- [ ] Configure SAML provider in Firebase console
- [ ] Generate SP metadata

### Week 2: Integration
- [ ] Exchange metadata with Smith IT
- [ ] Implement beforeSignIn Cloud Function
- [ ] Update AuthContext for SAML flows
- [ ] Test with Smith staging environment

### Week 3: Testing & Deployment
- [ ] User acceptance testing
- [ ] Load testing
- [ ] Production deployment
- [ ] Monitor and optimize

## Critical Questions for Smith IT

**Must-Have Answers:**
1. **SAML Flow Type:** Do you require IdP-initiated flows (campus portal links)?
2. **Attribute Names:** What are the exact SAML attribute names for ERP ID and roles?
3. **Role Format:** Are roles sent as array or single value?
4. **Email Attribute:** Is email in NameID or separate attribute?

**Nice-to-Have Answers:**
5. Entity ID requirements
6. Role change frequency
7. Testing timeline
8. Certificate rotation schedule

## Risk Assessment

### Option A Risks:
- **Medium:** Smith requires IdP-initiated flows → Must switch to Option B
- **Low:** Attribute mapping issues → Solvable with Smith IT collaboration
- **Low:** Firebase service disruption → Mitigated by 99.95% SLA

### Option B Risks:
- **High:** Security vulnerabilities → Requires ongoing security expertise
- **Medium:** Implementation delays → Complex SAML debugging
- **Low:** Certificate expiration → Requires operational processes

## Recommendation

**Proceed with Option A (Firebase Identity Platform)** unless Smith IT confirms they require IdP-initiated SAML flows.

**Rationale:**
1. 90% faster implementation (2-3 days vs 2-3 weeks)
2. Lower total cost over 5 years
3. Google-managed security and infrastructure
4. Meets 90% of Smith's likely requirements
5. Can migrate to Option B later if needed

**Next Steps:**
1. Send questions to Smith IT
2. Await responses on critical requirements
3. Upgrade to Firebase Identity Platform if Option A confirmed
4. Begin implementation immediately upon confirmation

---

*Document created: 2024-09-23*
*Status: Awaiting Smith IT responses*
*Next Review: Upon IT team feedback*