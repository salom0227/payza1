import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import AuthShell from "components/auth/AuthShell";
import { useAuth } from "contexts/AuthContext";

const AuthRegister = () => {
  const navigate = useNavigate();
  const { register, normalizeAuthError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "demo"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setError("");
  };

  const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,72}$/;

  const validate = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    if (!passwordRules.test(formData.password)) {
      return "Parol kamida 8 ta belgi, katta va kichik harf, raqam va maxsus belgini o'z ichiga olishi kerak.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      await register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        accountType: formData.accountType
      });
      navigate("/user-wallet-dashboard", { replace: true });
    } catch (authError) {
      setError(normalizeAuthError(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Register a secure PayZa account to start real transactions"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange("fullName")}
          autoComplete="name"
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange("password")}
          autoComplete="new-password"
          description="Use uppercase, lowercase, number, and symbol."
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          autoComplete="new-password"
          required
        />
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium leading-none text-foreground">
            Account Type
          </label>
          <select
            value={formData.accountType}
            onChange={handleChange("accountType")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="demo">Demo Account (Start with $10,000 bonus)</option>
            <option value="real">Real Account (Start with $0.00)</option>
          </select>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" fullWidth loading={loading}>
          Create Account
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center mt-5">
        Already registered?{" "}
        <Link to="/auth/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
};

export default AuthRegister;
