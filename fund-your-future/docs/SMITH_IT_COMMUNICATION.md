# Smith College IT Communication Templates

## Current Status
- **Initial Contact:** Completed - Received Shibboleth SAML confirmation
- **Follow-up Questions:** Template ready to send
- **Awaiting:** Responses to critical compatibility questions

## Email Template (Ready to Send)

### Subject: Fund Your Future - SAML SSO Integration Requirements

```
Hi [Smith IT Contact],

Thanks for the Shibboleth SAML details. We're moving forward with the integration and just want to confirm a few items to ensure compatibility:

Authentication Flow

Does Smith require IdP-initiated SAML flows, or are SP-initiated flows sufficient? Specifically, can users log in directly at fundyourfuture.edu, or should they always go through a campus portal?

SAML Attributes

Could you provide the exact attribute names for:

ERP system unique identifier

User roles/affiliations (single value or array format?)

Email address (NameID or separate attribute?)

Any other useful attributes (department, etc.)

Role Updates

How often do user roles change during a semester, and how quickly should changes reflect in Fund Your Future?

Technical Details

Your Shibboleth IdP entity ID

Any requirements for our SP entity ID format

Timeline for staging environment testing

This will help us configure our Service Provider correctly.

Thanks again for your help,
Chris
```

## Critical Questions Analysis

### Question Priority Matrix

| Question | Priority | Firebase Impact | Custom Impact |
|----------|----------|-----------------|---------------|
| IdP vs SP-initiated | 🔴 CRITICAL | Deal-breaker | Supported |
| Attribute names | 🟡 HIGH | Implementation | Implementation |
| Role update frequency | 🟡 HIGH | Expectation setting | Feature planning |
| Entity ID format | 🟢 MEDIUM | Configuration | Configuration |
| Testing timeline | 🟢 MEDIUM | Project planning | Project planning |

### Expected Responses & Next Steps

**If SP-initiated flows are sufficient:**
✅ Proceed with Firebase Identity Platform (Option A)
- Upgrade to Blaze plan
- Configure SAML provider
- Implement beforeSignIn function

**If IdP-initiated flows are required:**
⚠️ Switch to Custom Implementation (Option B)
- Implement Next.js SAML handlers
- Manual certificate management
- 2-3 week timeline

**If real-time role updates are required:**
⚠️ Consider Custom Implementation (Option B)
- Firebase updates roles only on next login
- Custom implementation can sync immediately

## Follow-up Communication Templates

### If They Choose SP-Initiated (Option A Path)

```
Subject: Fund Your Future - Moving Forward with Firebase SAML Integration

Hi [Name],

Perfect! SP-initiated flows work great for our implementation.

Next steps:
1. We'll configure our Firebase SAML Service Provider
2. Generate and send you our SP metadata
3. Schedule staging environment testing

Timeline: Ready for metadata exchange within 3-5 business days.

Best regards,
Chris
```

### If They Require IdP-Initiated (Option B Path)

```
Subject: Fund Your Future - Custom SAML Implementation for IdP-Initiated Flows

Hi [Name],

Thanks for clarifying the IdP-initiated requirement. We'll implement a custom SAML solution to support campus portal integration.

Next steps:
1. Develop custom SAML Service Provider (2-3 weeks)
2. Generate and send you our SP metadata
3. Schedule staging environment testing

Timeline: Ready for metadata exchange within 2-3 weeks.

Best regards,
Chris
```

### Metadata Exchange Template

```
Subject: Fund Your Future - SP Metadata for Review

Hi [Name],

Attached is our SAML Service Provider metadata for the Fund Your Future integration.

Key details:
- Entity ID: https://fundyourfuture.edu/saml/metadata
- Assertion Consumer Service: https://fundyourfuture.edu/api/auth/saml/callback
- Required Attributes: [List based on their response]

Please review and let us know:
1. Any required modifications
2. Your IdP metadata
3. Timeline for staging environment testing

Best regards,
Chris
```

## Internal Action Items (Upon IT Response)

### Immediate Actions:
- [ ] Review Smith IT responses
- [ ] Confirm Option A vs Option B decision
- [ ] Update PROJECT_CONTEXT.md with final decision
- [ ] Begin implementation planning

### Option A Actions (Firebase):
- [ ] Upgrade Firebase project to Blaze plan
- [ ] Enable Identity Platform
- [ ] Configure SAML provider
- [ ] Implement beforeSignIn Cloud Function
- [ ] Generate SP metadata

### Option B Actions (Custom):
- [ ] Install SAML dependencies (@node-saml/passport-saml)
- [ ] Create API route structure
- [ ] Implement SAML validation
- [ ] Set up certificate management
- [ ] Generate SP metadata

## Contact Information

**Smith College IT Team:**
- Primary Contact: [Name from initial response]
- Third-party App Review: John Singler (pending contact)
- Technical Questions: [Name from Shibboleth response]

**Fund Your Future Team:**
- Technical Lead: Chris
- Project Email: [project-email]
- Project Repository: `/Users/chris_mac_air/work/10seven/fund-your-future`

---

*Document created: 2024-09-23*
*Status: Template ready, awaiting Smith IT responses*
*Next Action: Send email template when ready*