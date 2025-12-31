const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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
    ADMIN_USER_DETAILS: (id) => `/admin/users/${id}`,
    ADMIN_JOBS: '/admin/jobs',
    ADMIN_WITHDRAWALS: '/admin/withdrawals',
    ADMIN_WITHDRAWAL_APPROVE: (id) => `/admin/withdrawals/${id}/approve`,
    ADMIN_WITHDRAWAL_REJECT: (id) => `/admin/withdrawals/${id}/reject`,
    ADMIN_STATS: '/admin/stats',
};

