"use client"
import "./RegisterPage.scss"
import Link from "next/link";
import { Mail, Lock, Phone, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const tRegisterText = useTranslations("registerPage");
	const tPlaceholder = useTranslations("registerPage.placeholders");

	return (
		<main className="register">
			<div className="register__wrapper">
				<h1 className="register__title">{tRegisterText("title")}</h1>

				<form className="register__form">
					<div className="form-header">
						<h3>{tRegisterText("welcome")}</h3>
						<div className="tabs">
							<Link href="/login" className="tab">{tRegisterText("tabLogin")}</Link>
							<Link href="/register" className="tab active">{tRegisterText("tabRegister")}</Link>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group with-icon">
							<label>{tRegisterText("firstName")}</label>
							<div className="input-wrapper">
								<User className="input-icon" size={18} />
								<input type="text" placeholder={tPlaceholder("firstName")} />
							</div>
						</div>
						<div className="form-group with-icon">
							<label>{tRegisterText("lastName")}</label>
							<div className="input-wrapper">
								<User className="input-icon" size={18} />
								<input type="text" placeholder={tPlaceholder("lastName")} />
							</div>
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tRegisterText("email")}</label>
						<div className="input-wrapper">
							<Mail className="input-icon" size={18} />
							<input type="email" placeholder={tPlaceholder("email")} />
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tRegisterText("phone")}</label>
						<div className="input-wrapper">
							<Phone className="input-icon" size={18} />
							<input type="tel" placeholder={tPlaceholder("phone")} />
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tRegisterText("password")}</label>
						<div className="input-wrapper">
							<Lock className="input-icon" size={18} />
							<input
								type={showPassword ? "text" : "password"}
								placeholder={tPlaceholder("password")}
							/>
							<button
								type="button"
								className="eye-button"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tRegisterText("confirmPassword")}</label>
						<div className="input-wrapper">
							<Lock className="input-icon" size={18} />
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder={tPlaceholder("confirmPassword")}
							/>
							<button
								type="button"
								className="eye-button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					<button type="submit" className="btn">{tRegisterText("registerButton")}</button>

					<p className="terms">
						{tRegisterText("termsNotice.text1")}{" "}
						<Link href="#">{tRegisterText("termsNotice.text2")}</Link> {tRegisterText("termsNotice.text3")}{" "}
						<Link href="#">{tRegisterText("termsNotice.text4")}</Link>
					</p>
				</form>
			</div>
		</main>
	);
};

export default RegisterPage;
