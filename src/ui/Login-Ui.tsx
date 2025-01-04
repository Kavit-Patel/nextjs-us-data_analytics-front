import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login = () => {
  return (
    <div className="flex flex-col gap-4 min-h-[calc(100vh-64px)] items-center justify-center bg-gray-700">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Sign-in
        </h1>
        <GoogleLoginButton />
        <p className="text-sm text-gray-600 mt-4">
          Redirecting you to a secure Google login page...
        </p>
      </div>
    </div>
  );
};

export default Login;
