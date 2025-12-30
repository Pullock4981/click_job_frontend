import Layout from '../components/layout/Layout.jsx';
import ReferralHero from '../components/referral/ReferralHero.jsx';
import ReferralFeatures from '../components/referral/ReferralFeatures.jsx';
import HowItWorks from '../components/referral/HowItWorks.jsx';
import PromotionalTips from '../components/referral/PromotionalTips.jsx';
import ReferralCTA from '../components/referral/ReferralCTA.jsx';
import ReferralFAQ from '../components/referral/ReferralFAQ.jsx';

const ReferralProgram = () => {
    return (
        <Layout>
            <ReferralHero />
            <HowItWorks />
            <ReferralFeatures />
            <PromotionalTips />
            <ReferralCTA />
            <ReferralFAQ />
        </Layout>
    );
};

export default ReferralProgram;
