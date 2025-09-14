"use client"
import "./LoginPage.scss"
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const tLoginText = useTranslations("loginPage")
	const tLoginPalaceholders = useTranslations("loginPage.placeholders")


	const togglePassword = () => {
		setShowPassword(prev => !prev);
	};

	return (
		<main className="login">
			<div className="login__wrapper">
				<h1 className="login__title">{tLoginText("title")}</h1>

				<form className="login__form">
					<div className="form-header">
						<h3>{tLoginText("welcome")}</h3>
						<div className="tabs">
							<Link href="/login" className="tab active">{tLoginText("tabLogin")}</Link>
							<Link href="/register" className="tab">{tLoginText("tabRegister")}</Link>
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tLoginText("email")}</label>
						<div className="input-wrapper">
							<Mail className="input-icon" size={18} />
							<input type="email" placeholder={tLoginPalaceholders("email")} />
						</div>
					</div>

					<div className="form-group with-icon">
						<label>{tLoginText("password")}</label>
						<div className="input-wrapper">
							<Lock className="input-icon" size={18} />
							<input
								type={showPassword ? "text" : "password"}
								placeholder={tLoginPalaceholders("password")}
							/>
							<button
								type="button"
								className="eye-button"
								onClick={togglePassword}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
						<Link href="#" className="forgot-password">{tLoginText("forgotPassword")}</Link>
					</div>

					<button type="submit" className="btn">{tLoginText("loginButton")}</button>

					<div className="divider"><span>{tLoginText("orContinue")}</span></div>

					<div className="socials">
						<button className="social">
							<Image src="/assets/icon/google-icon.svg" width={16} height={16} alt="Google" />
							<span>Google</span>
						</button>
						<button className="social">
							<Image src="/assets/icon/apple-icon.svg" width={16} height={16} alt="Apple" />
							<span>Apple</span>
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default LoginPage;
