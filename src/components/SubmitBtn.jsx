import { useNavigation } from 'react-router';

// eslint-disable-next-line react/prop-types
const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type="submit"
      className="btn btn-block btn-primary"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner"> Sending...</span>
      ) : (
        text || 'Submit'
      )}
    </button>
  );
};

export default SubmitBtn;
