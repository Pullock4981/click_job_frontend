// Force localhost for development to ensure local backend changes are seen
const base = import.meta.env.DEV ? 'http://localhost:5000' : (import.meta.env.VITE_API_URL || 'http://localhost:5000');
export const API_BASE_URL = base.endsWith('/api') ? base : `${base}/api`;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    // Auth
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY_EMAIL: (token) => `/auth/verify-email/${token}`,
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: (token) => `/auth/reset-password/${token}`,
    ME: '/auth/me',

    // Jobs
    JOBS: '/jobs',
    MY_JOBS: '/jobs/my-jobs',
    JOB_DETAILS: (id) => `/jobs/${id}`,
    APPLY_JOB: (id) => `/jobs/${id}/apply`,
    JOB_APPLICANTS: (id) => `/jobs/${id}/applicants`,
    ASSIGN_JOB: (id, userId) => `/jobs/${id}/assign/${userId}`,
    REPORT_JOB: (id) => `/jobs/${id}/report`,

    // Works
    MY_WORK: '/works/my-work',
    WORK_DETAILS: (id) => `/works/${id}`,
    SUBMIT_WORK: (id) => `/works/${id}/submit`,
    APPROVE_WORK: (id) => `/works/${id}/approve`,
    REJECT_WORK: (id) => `/works/${id}/reject`,

    // Users
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    PUBLIC_PROFILE: (id) => `/users/${id}/public`,
    DASHBOARD: '/users/dashboard',

    // Wallet
    WALLET: '/wallet',
    DEPOSIT: '/wallet/deposit',
    WITHDRAW: '/wallet/withdraw',

    // Transactions
    TRANSACTIONS: '/transactions',
    TRANSACTION_DETAILS: (id) => `/transactions/${id}`,

    // Referrals
    MY_REFERRAL_CODE: '/referrals/my-code',
    MY_REFERRALS: '/referrals/my-referrals',
    REFERRAL_EARNINGS: '/referrals/earnings',
    APPLY_REFERRAL_CODE: '/referrals/apply-code',

    // Subscriptions
    SUBSCRIPTION_PLANS: '/subscriptions/plans',
    MY_SUBSCRIPTION: '/subscriptions/my-plan',
    SUBSCRIBE: '/subscriptions/subscribe',
    CANCEL_SUBSCRIPTION: '/subscriptions/cancel',

    // Notifications
    NOTIFICATIONS: '/notifications',
    UNREAD_COUNT: '/notifications/unread-count',
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE_NOTIFICATION: (id) => `/notifications/${id}`,

    // Chat
    MY_CHATS: '/chat',
    CHAT_DETAILS: (id) => `/chat/${id}`,
    CREATE_CHAT: '/chat',
    SEND_MESSAGE: (id) => `/chat/${id}`,
    MARK_AS_READ: (id) => `/chat/${id}`,
    UNREAD_COUNT_CHAT: '/chat/unread-count',

    // Activity
    RECENT_ACTIVITY: '/activity/recent',

    // Stats
    PUBLIC_STATS: '/stats/public',

    // Reviews
    REVIEWS: '/reviews',
    USER_REVIEWS: (userId) => `/reviews/user/${userId}`,

    // Upload
    UPLOAD_SINGLE: '/upload/single',
    UPLOAD_MULTIPLE: '/upload/multiple',

    // Leaderboard
    TOP_DEPOSITORS: '/leaderboard/top-depositors',
    TOP_WORKERS: '/leaderboard/top-workers',
    TOP_JOB_POSTERS: '/leaderboard/top-job-posters',
    TOP_REFERRERS: '/leaderboard/top-referrers',
    TOP_USERS: '/leaderboard/top-users',
    MY_RANK: '/leaderboard/my-rank',

    // Admin
    ADMIN_USERS: '/admin/users',
    ADMIN_DUPLICATE_USERS: '/admin/users/duplicate',
    ADMIN_ACCOUNTS: '/admin/accounts',
    ADMIN_USER_DETAILS: (id) => `/admin/users/${id}`,
    COMPANY_CONTENT: '/company',
    HEADER_NOTICE: '/admin/header-notice',
    COUNTER_INFO: '/admin/counter-info',
    ADMIN_JOBS: '/admin/jobs',
    ADMIN_WITHDRAWALS: '/admin/withdrawals',
    ADMIN_WITHDRAWAL_APPROVE: (id) => `/admin/withdrawals/${id}/approve`,
    ADMIN_WITHDRAWAL_REJECT: (id) => `/admin/withdrawals/${id}/reject`,
    ADMIN_STATS: '/admin/stats',
    ADVERTISEMENTS: '/advertisements',
    MY_ADVERTISEMENTS: '/advertisements/my',
    SPIN_WHEEL: '/games/spin',
    CONTACT_INFO: '/admin/contact-info',
    CONTACT_MESSAGES: '/admin/contact-messages',
    GOOGLE_ADS: '/admin/google-ads',
    SERVICES: '/admin/services',
    ADS_RATES: '/advertisements/rates',
    CLICK_EARN_ADS: '/advertisements/click-earn',
    LOTTERY: '/lottery',
    PREMIUM_PACKAGES: '/admin/packages',
    PREMIUM_USERS: '/admin/premium-users',
    APPROVAL_JOBS: '/admin/jobs/approval',
    DELETE_REQUEST_JOBS: '/admin/jobs/delete-requests',
    JOB_WORKS: '/admin/jobs/works',
    DEPOSIT_METHODS: '/admin/deposit/methods',
    DEPOSIT_LIST: '/admin/deposit/list',
    WITHDRAW_METHODS: '/admin/withdraw/methods',
    WITHDRAW_LIST: '/admin/withdraw/list',
    TRANSACTION_STATUS: '/admin/transactions',
    SMM_CATEGORIES: '/admin/smm/categories',
    SMM_SERVICES: '/admin/smm/services',
    SMM_REQUESTS: '/admin/smm/requests',
    HEADLINES: '/admin/headlines',
    TOP_REPORTS: '/admin/reports',
    REFERRAL_SETTINGS: '/admin/referral-settings',
    JOB_CATEGORIES: '/admin/job-categories',
    JOB_SUB_CATEGORIES: '/admin/job-sub-categories',
    COUNTRIES: '/admin/countries',
    LOCATION_ZONES: '/admin/location-zones',
    APP_SETTINGS: '/admin/app-settings',
    SPIN_SETTINGS: '/admin/spin-settings',
    CUSTOM_SCRIPTS: '/admin/custom-scripts',
    ADMIN_MESSAGES: '/admin/admin-messages',
    WEBSITE_INFO: '/admin/website-info',
};
