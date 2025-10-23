'use client';

import {
  Building2,
  CreditCard,
  Smartphone,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  ShieldX,
  AlertTriangle,
  Clock,
  Home,
  MapPin,
  Wallet,
  Receipt,
  Ban,
  Lock,
  Unlock,
  ArrowRight,
  ArrowLeft,
  Globe,
  Wifi
} from 'lucide-react';

interface IllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm': return 'w-24 h-24';
    case 'md': return 'w-32 h-32';
    case 'lg': return 'w-48 h-48';
    case 'xl': return 'w-64 h-64';
    default: return 'w-32 h-32';
  }
};

// Page 3: Financial Exclusion
export function FinancialExclusionIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex flex-col items-center justify-center bg-[#E5DEEF] rounded-2xl p-6 relative`}>
      {/* Central person icon */}
      <div className="relative mb-2">
        <Users className="w-16 h-16 text-[#2E1E72]" />
        <Ban className="w-20 h-20 text-[#2E1E72] absolute -top-2 -left-2 opacity-50" />
      </div>

      {/* Surrounding payment methods with X marks */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="relative">
          <CreditCard className="w-8 h-8 text-[#2E1E72]" />
          <ShieldX className="w-10 h-10 text-[#2E1E72] absolute -top-2 -left-2 opacity-70" />
        </div>
        <div className="relative">
          <Smartphone className="w-8 h-8 text-[#2E1E72]" />
          <ShieldX className="w-10 h-10 text-[#2E1E72] absolute -top-2 -left-2 opacity-70" />
        </div>
        <div className="relative">
          <Building2 className="w-8 h-8 text-[#2E1E72]" />
          <ShieldX className="w-10 h-10 text-[#2E1E72] absolute -top-2 -left-2 opacity-70" />
        </div>
      </div>

      <p className="text-xs text-[#2E1E72] text-center mt-2 font-medium">Financial Exclusion</p>
    </div>
  );
}

// Page 14: Banking Emotions
export function BankingEmotionsIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex items-center justify-between bg-[#E5DEEF] rounded-2xl p-6`}>
      {/* Stressed side */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Users className="w-12 h-12 text-[#2E1E72]" />
          <TrendingDown className="w-8 h-8 text-[#2E1E72] absolute -top-2 -right-2 opacity-70" />
        </div>
        <div className="flex gap-1 mt-1">
          <DollarSign className="w-6 h-6 text-[#2E1E72] opacity-70" />
          <AlertTriangle className="w-6 h-6 text-[#2E1E72] opacity-70" />
        </div>
        <p className="text-xs text-[#2E1E72] mt-1">Stress</p>
      </div>

      {/* Central bank */}
      <Building2 className="w-16 h-16 text-[#2E1E72] mx-4" />

      {/* Happy side */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Users className="w-12 h-12 text-[#2E1E72]" />
          <TrendingUp className="w-8 h-8 text-[#2E1E72] absolute -top-2 -right-2 opacity-90" />
        </div>
        <div className="flex gap-1 mt-1">
          <DollarSign className="w-6 h-6 text-[#2E1E72]" />
          <ShieldX className="w-6 h-6 text-[#2E1E72] transform rotate-45 opacity-90" />
        </div>
        <p className="text-xs text-[#2E1E72] mt-1">Relief</p>
      </div>
    </div>
  );
}

// Page 15-16: Banking History
export function BankingHistoryIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex items-center justify-between bg-[#E5DEEF] rounded-2xl p-6`}>
      {/* 1780s */}
      <div className="flex flex-col items-center">
        <Home className="w-10 h-10 text-[#2E1E72]" />
        <p className="text-xs text-[#2E1E72] mt-1">1780s</p>
      </div>

      <ArrowRight className="w-8 h-8 text-[#2E1E72]" />

      {/* 1800s */}
      <div className="flex flex-col items-center">
        <Building2 className="w-10 h-10 text-[#2E1E72]" />
        <p className="text-xs text-[#2E1E72] mt-1">1800s</p>
      </div>

      <ArrowRight className="w-8 h-8 text-[#2E1E72]" />

      {/* Modern */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Building2 className="w-10 h-10 text-[#2E1E72]" />
          <Smartphone className="w-6 h-6 text-[#2E1E72] absolute -bottom-1 -right-1" />
        </div>
        <p className="text-xs text-[#2E1E72] mt-1">Modern</p>
      </div>
    </div>
  );
}

// Page 17: Bank Ecosystem
export function BankEcosystemIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} bg-[#E5DEEF] rounded-2xl p-6 relative`}>
      {/* Central bank */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Building2 className="w-8 h-8 text-[#2E1E72]" />
      </div>

      {/* Surrounding entities */}
      <Home className="w-5 h-5 text-[#2E1E72] absolute top-2 left-2" />
      <Users className="w-10 h-10 text-[#2E1E72] absolute top-2 right-2" />
      <MapPin className="w-10 h-10 text-[#2E1E72] absolute bottom-2 left-2" />
      <TrendingUp className="w-10 h-10 text-[#2E1E72] absolute bottom-2 right-2" />

      {/* Money flow indicators */}
      <DollarSign className="w-6 h-6 text-[#2E1E72] absolute top-8 left-8" />
      <DollarSign className="w-6 h-6 text-[#2E1E72] absolute top-8 right-8" />
      <DollarSign className="w-6 h-6 text-[#2E1E72] absolute bottom-8 left-8" />
      <DollarSign className="w-6 h-6 text-[#2E1E72] absolute bottom-8 right-8" />
    </div>
  );
}

// Page 21: Bank Profits
export function BankProfitsIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex flex-col items-center justify-center bg-[#E5DEEF] rounded-2xl p-6`}>
      {/* Stacked coins */}
      <div className="flex items-end gap-2 mb-2">
        <div className="w-3 h-6 bg-[#2E1E72] rounded-t"></div>
        <div className="w-3 h-8 bg-[#2E1E72] rounded-t"></div>
        <div className="w-3 h-10 bg-[#2E1E72] rounded-t"></div>
        <div className="w-3 h-8 bg-[#2E1E72] rounded-t"></div>
      </div>

      <div className="flex gap-1 mb-2">
        <TrendingUp className="w-8 h-8 text-[#2E1E72]" />
        <DollarSign className="w-8 h-8 text-[#2E1E72]" />
        <TrendingUp className="w-8 h-8 text-[#2E1E72]" />
      </div>

      <p className="text-xs text-[#2E1E72] text-center font-medium">Bank Profits</p>
    </div>
  );
}

// Page 24: Bank Fees
export function BankFeesIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex flex-col items-center justify-center bg-[#E5DEEF] rounded-2xl p-6 relative`}>
      {/* Central wallet */}
      <Wallet className="w-16 h-16 text-[#2E1E72] mb-2" />

      {/* Money leaving */}
      <div className="flex gap-2 mb-2">
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-[#2E1E72] opacity-70" />
          <ArrowRight className="w-6 h-6 text-[#2E1E72] opacity-70" />
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-[#2E1E72] opacity-70" />
          <ArrowRight className="w-6 h-6 text-[#2E1E72] opacity-70" />
        </div>
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-[#2E1E72] opacity-70" />
          <ArrowRight className="w-6 h-6 text-[#2E1E72] opacity-70" />
        </div>
      </div>

      {/* Fee types */}
      <div className="grid grid-cols-2 gap-1">
        <Receipt className="w-6 h-6 text-[#2E1E72]" />
        <AlertTriangle className="w-3 h-3 text-[#2E1E72] opacity-70" />
        <Clock className="w-6 h-6 text-[#2E1E72]" />
        <TrendingDown className="w-6 h-6 text-[#2E1E72] opacity-70" />
      </div>

      <p className="text-xs text-[#2E1E72] text-center font-medium mt-2">Multiple Fees</p>
    </div>
  );
}

// Page 30: Account Closure
export function AccountClosureIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex flex-col items-center justify-center bg-[#E5DEEF] rounded-2xl p-6 relative`}>
      {/* Locked bank */}
      <div className="relative mb-3">
        <Building2 className="w-8 h-8 text-[#2E1E72]" />
        <Lock className="w-10 h-10 text-[#2E1E72] absolute -top-2 -right-2 opacity-70" />
      </div>

      {/* Person locked out */}
      <div className="relative mb-2">
        <Users className="w-6 h-6 text-[#2E1E72]" />
        <Ban className="w-14 h-14 text-[#2E1E72] absolute -top-2 -left-2 opacity-50" />
      </div>

      <p className="text-xs text-[#2E1E72] text-center font-medium">Account Closed</p>
    </div>
  );
}

// Page 32: Alternative Financial Services
export function AlternativeFinancialIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} bg-[#E5DEEF] rounded-2xl p-6`}>
      {/* Multiple small buildings */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col items-center">
          <Home className="w-10 h-10 text-[#2E1E72]" />
          <p className="text-xs text-[#2E1E72] mt-1">Check Cash</p>
        </div>
        <div className="flex flex-col items-center">
          <Building2 className="w-10 h-10 text-[#2E1E72]" />
          <p className="text-xs text-[#2E1E72] mt-1">Payday</p>
        </div>
      </div>

      {/* High cost indicators */}
      <div className="flex justify-center gap-1 mb-2">
        <TrendingUp className="w-8 h-8 text-[#2E1E72] opacity-70" />
        <DollarSign className="w-4 h-4 text-[#2E1E72] opacity-70" />
        <AlertTriangle className="w-4 h-4 text-[#2E1E72] opacity-70" />
      </div>

      <p className="text-xs text-[#2E1E72] text-center font-medium">High Cost Services</p>
    </div>
  );
}

// Page 36: Digital Banking
export function DigitalBankingIllustration({ className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={`${sizeClasses} ${className} flex flex-col items-center justify-center bg-[#E5DEEF] rounded-2xl p-6 relative`}>
      {/* Central phone */}
      <Smartphone className="w-16 h-16 text-[#2E1E72] mb-2" />

      {/* Digital elements around */}
      <Wifi className="w-6 h-6 text-[#2E1E72] absolute top-3 left-3" />
      <Globe className="w-6 h-6 text-[#2E1E72] absolute top-3 right-3" />
      <CreditCard className="w-6 h-6 text-[#2E1E72] absolute bottom-3 left-3" />
      <DollarSign className="w-6 h-6 text-[#2E1E72] absolute bottom-3 right-3" />

      {/* Features */}
      <div className="flex gap-2 mt-2">
        <Clock className="w-6 h-6 text-[#2E1E72]" />
        <TrendingDown className="w-6 h-6 text-[#2E1E72]" />
        <Unlock className="w-6 h-6 text-[#2E1E72]" />
      </div>

      <p className="text-xs text-[#2E1E72] text-center font-medium mt-2">24/7 • Low Fees • Fast</p>
    </div>
  );
}