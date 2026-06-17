/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Briefcase,
  Mail,
  Calendar,
  Share2,
  Cpu,
  ListTodo,
  Search,
  Database,
  Award,
  GraduationCap,
  Sparkles,
  Phone,
  Linkedin,
  Facebook,
  Download,
  Check,
  Star,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  FileText,
  User,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Clock,
  ExternalLink,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  'briefcase': Briefcase,
  'mail': Mail,
  'calendar': Calendar,
  'share-2': Share2,
  'cpu': Cpu,
  'list-todo': ListTodo,
  'search': Search,
  'database': Database,
  'award': Award,
  'graduation-cap': GraduationCap,
  'sparkles': Sparkles,
  'phone': Phone,
  'linkedin': Linkedin,
  'facebook': Facebook,
  'download': Download,
  'check': Check,
  'star': Star,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'calendar-days': CalendarDays,
  'file-text': FileText,
  'user': User,
  'arrow-right': ArrowRight,
  'check-circle': CheckCircle,
  'menu': Menu,
  'x': X,
  'clock': Clock,
  'external-link': ExternalLink,
  'message-square': MessageSquare,
  'sun': Sun,
  'moon': Moon
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
  key?: any;
}

export function Icon({ name, className = '', size = 20, ...props }: IconProps) {
  const normalizedKey = name.toLowerCase().trim();
  const IconComponent = iconMap[normalizedKey] || Briefcase; // Fallback to briefcase if not found

  return <IconComponent className={className} size={size} {...props} />;
}
