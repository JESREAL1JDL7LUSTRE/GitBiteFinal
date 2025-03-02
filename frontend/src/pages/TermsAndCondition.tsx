import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
    const navigate = useNavigate();
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">Terms and Conditions</h1>
        <p className="text-lg text-center mb-8">
          Welcome to GitCook! By accessing or using our platform, you agree to the following terms and conditions.
          Please read them carefully before using our services.
        </p>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-orange-500">1. User Agreement</h2>
            <p className="mt-2">
              By creating an account on GitCook, you confirm that you are at least 18 years old or have legal
              permission from a guardian to use our services. You agree to provide accurate information and
              maintain the confidentiality of your login credentials. Any misuse of your account is solely
              your responsibility. GitCook reserves the right to suspend or terminate accounts that violate
              our terms.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-orange-500">2. Ordering and Payments</h2>
            <p className="mt-2">
              Orders placed through GitCook are final once confirmed. Payments must be made through our
              secure payment gateways, and refunds are subject to our cancellation policy. GitCook is not
              responsible for errors caused by incorrect payment details entered by the user. In the event
              of a failed transaction, users must contact their payment provider before reaching out to
              our support team.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-orange-500">3. Privacy Policy</h2>
            <p className="mt-2">
              Your personal information is handled with care in accordance with our privacy policy.
              We do not share or sell your data to third parties. By using GitCook, you consent to
              our collection and use of data for service improvements and personalized experiences.
              You can review our privacy policy for detailed information on how your data is managed.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-orange-500">4. Prohibited Activities</h2>
            <p className="mt-2">
              Users must not engage in fraudulent activities, attempt to hack our platform, or use GitCook
              for illegal purposes. We have the right to take action, including legal proceedings, against
              users who violate these rules. Any attempt to manipulate pricing, reviews, or services will
              result in account suspension.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-orange-500">5. Changes to Terms</h2>
            <p className="mt-2">
              GitCook reserves the right to update these terms at any time. Users will be notified of
              significant changes via email or in-app notifications. Continued use of our services after
              modifications indicates your acceptance of the updated terms. If you disagree with any changes,
              you may discontinue using GitCook.
            </p>
          </div>
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition" onClick={() => navigate(-1)}>
            Continue
          </button>
        </div>
      </div>
    );
};

export default TermsAndConditions;
