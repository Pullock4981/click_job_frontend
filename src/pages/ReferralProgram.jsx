import Layout from '../components/layout/Layout.jsx';
import ReferralHero from '../components/referral/ReferralHero.jsx';
import ReferralFeatures from '../components/referral/ReferralFeatures.jsx';
import HowItWorks from '../components/referral/HowItWorks.jsx';
import PromotionalTips from '../components/referral/PromotionalTips.jsx';
import ReferralCTA from '../components/referral/ReferralCTA.jsx';
import ReferralFAQ from '../components/referral/ReferralFAQ.jsx';
import ReferralDashboard from '../components/referral/ReferralDashboard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const ReferralProgram = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Layout showFooter={!isAuthenticated}>
            {isAuthenticated ? (
                <ReferralDashboard />
            ) : (
                <>
                    <ReferralHero />
                    <HowItWorks />
                    <ReferralFeatures />
                    <PromotionalTips />
                    <ReferralCTA />
                    <ReferralFAQ />
                </>
            )}
        </Layout>
    );
};

export default ReferralProgram;

