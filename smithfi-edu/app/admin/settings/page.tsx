/**
 * Admin Platform Settings
 * Basic system configuration and management settings
 */

'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/core/components/AppHeader';

interface PlatformSettings {
  platformName: string;
  institutionName: string;
  supportEmail: string;
  maxStudentsPerClass: number;
  enableRegistration: boolean;
  enableQuestions: boolean;
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
  emailNotifications: boolean;
  sessionTimeout: number; // minutes
}

const DEFAULT_SETTINGS: PlatformSettings = {
  platformName: 'Fund Your Future',
  institutionName: 'Smith College | CONWAY',
  supportEmail: 'support@fundyourfuture.edu',
  maxStudentsPerClass: 100,
  enableRegistration: true,
  enableQuestions: true,
  maintenanceMode: false,
  analyticsEnabled: true,
  emailNotifications: true,
  sessionTimeout: 60,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('platform_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage (in future: save to Firebase)
      localStorage.setItem('platform_settings', JSON.stringify(settings));

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSavedMessage('Settings saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSavedMessage('Error saving settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('platform_settings');
    setSavedMessage('Settings reset to defaults');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const updateSetting = <K extends keyof PlatformSettings>(
    key: K,
    value: PlatformSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Platform Settings"
        description="Configure system settings and platform preferences"
        breadcrumbs={[
          { href: '/admin', label: 'Admin Dashboard' },
          { href: '/admin/settings', label: 'Settings' },
        ]}
      />

      <main className="mx-auto w-[90%] max-w-4xl px-4 py-6">
        {/* Success Message */}
        {savedMessage && (
          <div
            className={`mb-6 rounded-lg border p-4 ${
              savedMessage.includes('Error')
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-green-200 bg-green-50 text-green-800'
            }`}
          >
            {savedMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Platform Settings */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              🏫 Platform Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) =>
                    updateSetting('platformName', e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder="Fund Your Future"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={settings.institutionName}
                  onChange={(e) =>
                    updateSetting('institutionName', e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder="Smith College | CONWAY"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    updateSetting('supportEmail', e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder="support@fundyourfuture.edu"
                />
              </div>
            </div>
          </div>

          {/* Student Management Settings */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              👥 Student Management
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Max Students Per Class
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={settings.maxStudentsPerClass}
                  onChange={(e) =>
                    updateSetting(
                      'maxStudentsPerClass',
                      parseInt(e.target.value) || 100
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Session Timeout (minutes)
                </label>
                <select
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    updateSetting('sessionTimeout', parseInt(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={240}>4 hours</option>
                  <option value={480}>8 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              🔧 Feature Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Student Registration
                  </h4>
                  <p className="text-sm text-gray-600">
                    Allow new students to register accounts
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.enableRegistration}
                    onChange={(e) =>
                      updateSetting('enableRegistration', e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Student Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Allow students to submit questions to instructors
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.enableQuestions}
                    onChange={(e) =>
                      updateSetting('enableQuestions', e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Analytics Tracking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Track student progress and engagement metrics
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.analyticsEnabled}
                    onChange={(e) =>
                      updateSetting('analyticsEnabled', e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                </label>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Send automatic email notifications for important events
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      updateSetting('emailNotifications', e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Maintenance */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              🚧 System Maintenance
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
              <div>
                <h4 className="font-medium text-red-900">Maintenance Mode</h4>
                <p className="text-sm text-red-700">
                  Temporarily disable student access for system updates
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    updateSetting('maintenanceMode', e.target.checked)
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
              </label>
            </div>
          </div>

          {/* System Information */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              📊 System Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">v1.0.0</div>
                <div className="text-sm text-gray-600">Platform Version</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">Last Updated</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-600">
                  Firebase
                </div>
                <div className="text-sm text-gray-600">Database Type</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>💾 Save Settings</>
              )}
            </button>
            <button
              onClick={handleReset}
              className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
            >
              🔄 Reset to Defaults
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
