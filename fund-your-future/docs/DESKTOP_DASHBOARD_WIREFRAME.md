# Desktop Dashboard Wireframe & Specifications

## Layout Overview (1200px+ Desktop)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER (H: 64px)                                                        │
│ ┌─────────┐ ┌─────────────────────────────────────┐ ┌─────────┐ ┌───────────┐ │
│ │ LOGO    │ │ PROGRESS: ████████░░░░ 67% Complete │ │ SEARCH  │ │ PROFILE   │ │
│ │ Fund Your Future │ │ 4 of 6 modules • Level 3 • 1,240 XP │ │    🔍   │ │    👤     │ │
│ └─────────┘ └─────────────────────────────────────┘ └─────────┘ └───────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────────────────────────┐ ┌─────────────────┐ │
│ │ SIDEBAR         │ │ MAIN DASHBOARD                      │ │ PROGRESS PANEL  │ │
│ │ (W: 280px)      │ │ (W: 640px)                          │ │ (W: 280px)      │ │
│ │                 │ │                                     │ │                 │ │
│ │ 📚 Quick Access │ │ 🎓 Your Learning Journey           │ │ 🏆 Achievements │ │
│ │ ├─ Continue     │ │                                     │ │ ┌─────────────┐ │ │
│ │ │   Learning    │ │ ┌─────────┬─────────┬─────────┐     │ │ │ Level 3     │ │ │
│ │ │   "ATM Fees"  │ │ │MODULE 1 │MODULE 2 │MODULE 3 │     │ │ │ 1,240 XP    │ │ │
│ │ └─ Resume Unit  │ │ │Banking  │Budgeting│ Credit  │     │ │ │ ████████░░░ │ │ │
│ │                 │ │ │& Fees   │         │         │     │ │ │ 80% to L4   │ │ │
│ │ 📖 All Modules  │ │ │   ✓ 5/5 │  ⚡ 1/4 │  🔒 0/5 │     │ │ └─────────────┘ │ │
│ │ ✓ Module 1      │ │ │   100%  │   25%   │   0%    │     │ │                 │ │
│ │ ⚡ Module 2      │ │ └─────────┴─────────┴─────────┘     │ │ 🔥 7-Day Streak │ │
│ │ 🔒 Module 3      │ │                                     │ │ ┌─────────────┐ │ │
│ │ 🔒 Module 4      │ │ ┌─────────┬─────────┬─────────┐     │ │ │ S M T W T F S │ │
│ │ 🔒 Module 5      │ │ │MODULE 4 │MODULE 5 │MODULE 6 │     │ │ │ ✓ ✓ ✓ ✓ ✓ ✓ ✓ │ │
│ │ 🔒 Module 6      │ │ │Investing│Insurance│ Taxes   │     │ │ └─────────────┘ │ │
│ │                 │ │ │         │         │         │     │ │                 │ │
│ │ 📊 Analytics    │ │ │  🔒 0/6 │  🔒 0/4 │  🔒 0/5 │     │ │ 🎯 Next Goals   │ │
│ │ ├─ Time Spent   │ │ │   0%    │   0%    │   0%    │     │ │ □ Complete      │ │
│ │ ├─ Progress     │ │ └─────────┴─────────┴─────────┘     │ │   Module 2      │ │
│ │ └─ Performance  │ │                                     │ │ □ Earn "Budget  │ │
│ │                 │ │ 🚀 Continue Your Learning           │ │   Master" Badge │ │
│ │ 🏆 Achievements │ │ ┌─────────────────────────────────┐ │ │ □ Reach Level 4 │ │
│ │ ├─ Banking Pro   │ │ │ 📖 "It's a Fee-for-All"       │ │ │                 │ │
│ │ ├─ First Week   │ │ │ Module 2, Unit 2               │ │ │ 📈 This Week    │ │
│ │ └─ 5 Day Streak │ │ │ ⏱️  12 minutes remaining       │ │ │ • 4 units done  │ │
│ │                 │ │ │ 🎯 Continue → [START]          │ │ │ • 2.5 hrs spent │ │
│ │ ❓ Help & Support│ │ └─────────────────────────────────┘ │ │ • 340 XP earned │ │
│ │                 │ │                                     │ │                 │ │
│ └─────────────────┘ └─────────────────────────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Component Specifications

### Header Bar (64px height)
```scss
.global-header {
  height: 64px;
  background: linear-gradient(135deg, #0f2d52 0%, #2e1e72 100%);
  color: white;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 200px 1fr 200px 120px;
  align-items: center;
  gap: 24px;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
}

.global-progress {
  .progress-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;

    .fill {
      background: linear-gradient(90deg, #9d71fa 0%, #8577b7 100%);
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }

  .progress-text {
    font-size: 12px;
    margin-top: 4px;
    opacity: 0.9;
  }
}

.global-search {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 16px;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
}
```

### Sidebar (280px width)
```scss
.sidebar {
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  padding: 24px;
  overflow-y: auto;

  .section {
    margin-bottom: 32px;

    .section-title {
      font-family: 'Red Hat Display', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }
  }

  .module-nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(157, 113, 250, 0.1);
    }

    &.active {
      background: #9d71fa;
      color: white;
    }

    .icon {
      margin-right: 12px;
      font-size: 16px;
    }

    .progress {
      margin-left: auto;
      font-size: 12px;
      opacity: 0.7;
    }
  }
}
```

### Main Dashboard (640px width)
```scss
.main-dashboard {
  width: 640px;
  padding: 32px;

  .dashboard-title {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 600;
    color: #0f2d52;
    margin-bottom: 8px;
  }

  .dashboard-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
  }

  .modules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 40px;
  }

  .module-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 24px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(15, 45, 82, 0.1);
      border-color: #9d71fa;
    }

    &.completed {
      border-color: #28a745;
      .status-icon { color: #28a745; }
    }

    &.current {
      border-color: #9d71fa;
      .status-icon { color: #9d71fa; }
    }

    &.locked {
      opacity: 0.6;
      cursor: not-allowed;
      .status-icon { color: #ccc; }
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;

      .module-number {
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status-icon {
        font-size: 20px;
      }
    }

    .module-title {
      font-family: 'Red Hat Display', sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #0f2d52;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .module-progress {
      margin-bottom: 16px;

      .progress-bar {
        height: 6px;
        background: #f1f3f4;
        border-radius: 3px;
        overflow: hidden;

        .fill {
          height: 100%;
          background: linear-gradient(90deg, #9d71fa 0%, #8577b7 100%);
          transition: width 0.3s ease;
        }
      }

      .progress-text {
        font-size: 12px;
        color: #666;
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
      }
    }

    .quick-actions {
      position: absolute;
      bottom: 16px;
      right: 16px;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.2s ease;

      .btn-quick {
        background: #9d71fa;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          background: #8577b7;
        }
      }
    }

    &:hover .quick-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .continue-learning {
    background: linear-gradient(135deg, #e5deef 0%, #f1f3f4 100%);
    border-radius: 16px;
    padding: 32px;

    .continue-title {
      font-family: 'Red Hat Display', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #0f2d52;
      margin-bottom: 16px;
    }

    .current-unit {
      background: white;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .unit-info {
        .unit-title {
          font-size: 16px;
          font-weight: 600;
          color: #0f2d52;
          margin-bottom: 4px;
        }

        .unit-meta {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .time-remaining {
          font-size: 12px;
          color: #9d71fa;
          font-weight: 500;
        }
      }

      .continue-btn {
        background: #9d71fa;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 24px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #8577b7;
          transform: translateX(4px);
        }
      }
    }
  }
}
```

### Progress Panel (280px width)
```scss
.progress-panel {
  width: 280px;
  background: #f8f9fa;
  border-left: 1px solid #e9ecef;
  padding: 24px;

  .achievement-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    margin-bottom: 24px;
    border: 2px solid #e9ecef;

    .level-badge {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #9d71fa 0%, #8577b7 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      font-weight: 600;
      margin: 0 auto 12px;
    }

    .xp-count {
      font-size: 20px;
      font-weight: 600;
      color: #0f2d52;
      margin-bottom: 8px;
    }

    .xp-progress {
      .progress-bar {
        height: 6px;
        background: #f1f3f4;
        border-radius: 3px;
        margin-bottom: 8px;

        .fill {
          height: 100%;
          background: #9d71fa;
          border-radius: 3px;
        }
      }

      .progress-text {
        font-size: 12px;
        color: #666;
      }
    }
  }

  .streak-calendar {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;

    .streak-title {
      font-size: 14px;
      font-weight: 600;
      color: #0f2d52;
      margin-bottom: 12px;
      display: flex;
      align-items: center;

      .fire-icon {
        color: #ff6b35;
        margin-right: 8px;
      }
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;

      .day {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 500;

        &.header {
          color: #666;
          font-weight: 600;
        }

        &.completed {
          background: #9d71fa;
          color: white;
        }

        &.today {
          background: #e5deef;
          color: #0f2d52;
          border: 2px solid #9d71fa;
        }
      }
    }
  }

  .goals-list {
    .goal-item {
      display: flex;
      align-items: center;
      padding: 8px 0;

      .checkbox {
        width: 16px;
        height: 16px;
        border: 2px solid #ddd;
        border-radius: 3px;
        margin-right: 12px;

        &.checked {
          background: #9d71fa;
          border-color: #9d71fa;

          &::after {
            content: '✓';
            color: white;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
        }
      }

      .goal-text {
        font-size: 14px;
        color: #333;
        line-height: 1.4;
      }
    }
  }

  .weekly-stats {
    background: white;
    border-radius: 12px;
    padding: 16px;

    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f1f3f4;

      &:last-child {
        border-bottom: none;
      }

      .stat-label {
        font-size: 14px;
        color: #666;
      }

      .stat-value {
        font-size: 14px;
        font-weight: 600;
        color: #0f2d52;
      }
    }
  }
}
```

## Responsive Behavior

### Tablet (768px - 1023px)
```scss
@media (max-width: 1023px) {
  .desktop-layout {
    grid-template-areas:
      "header header"
      "main aside";

    .sidebar {
      transform: translateX(-100%);
      position: fixed;
      z-index: 100;

      &.open {
        transform: translateX(0);
      }
    }

    .modules-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
```

### Mobile Fallback (< 768px)
```scss
@media (max-width: 767px) {
  .desktop-layout {
    grid-template-areas: "main";

    .sidebar,
    .progress-panel {
      display: none;
    }

    .modules-grid {
      grid-template-columns: 1fr;
    }

    .main-dashboard {
      width: 100%;
      padding: 16px;
    }
  }
}
```

## Interaction States

### Hover Animations
```scss
@keyframes moduleHover {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

@keyframes quickActionAppear {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes continueButtonHover {
  0% { transform: translateX(0); }
  100% { transform: translateX(4px); }
}
```

### Focus States
```scss
.module-card:focus {
  outline: 2px solid #9d71fa;
  outline-offset: 2px;
}

.continue-btn:focus {
  outline: 2px solid #9d71fa;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(157, 113, 250, 0.2);
}
```

## Accessibility Features

### Screen Reader Support
```html
<!-- Module Card -->
<div class="module-card" role="article" aria-labelledby="module-1-title" tabindex="0">
  <h3 id="module-1-title" class="module-title">Banking & Fees</h3>
  <div class="module-progress" aria-label="Progress: 5 of 5 units completed">
    <!-- Progress content -->
  </div>
  <button class="btn-quick" aria-label="Continue Module 1: Banking & Fees">
    Continue
  </button>
</div>

<!-- Progress Panel -->
<aside class="progress-panel" aria-label="Learning progress and achievements">
  <!-- Content -->
</aside>
```

### Keyboard Navigation
```scss
// Focus management
.module-card {
  &:focus-visible {
    outline: 2px solid #9d71fa;
    outline-offset: 2px;
  }
}

// Skip links
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #0f2d52;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 1000;

  &:focus {
    top: 6px;
  }
}
```

This wireframe provides a comprehensive desktop dashboard that maintains the educational focus and design language of the mobile version while leveraging desktop advantages for enhanced productivity and context awareness.