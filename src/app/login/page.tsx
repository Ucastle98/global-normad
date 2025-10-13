// src/app/login/page.tsx
"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

const wrapper = "min-h-screen flex justify-center items-center";

function isValidEmail(email: string): boolean {
  const effective = /^[^\s@]+@[^\s@]+\.(com|co.kr)$/i;
  return effective.test(email);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = isValidEmail(email); // 검사

  const isValid = isEmailValid && password.trim().length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    console.log("로그인 성공");
  };

  return (
    <div className={wrapper}>
      <div className="w-[640px]">
        <p className="mb-8">이미지</p>
        <form>
          <Input
            label="이메일"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            status={!isValidEmail(email) && email ? "error" : "default"}
            helpText={
              !isValidEmail(email) && email
                ? "이메일 형식으로 작성해 주세요."
                : undefined
            }
            className="mb-8"
          />
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-8"
            showPasswordToggle
            status={
              password.length > 0 && password.trim().length < 8
                ? "error"
                : "default"
            }
            helpText={
              password.length > 0 && password.trim().length < 8
                ? "8자 이상 입력해 주세요."
                : undefined
            }
          />
        </form>
        <Button
          onClick={handleSubmit}
          type="submit"
          label="로그인"
          size="lg"
          fullWidth
        />
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <div className="mt-8">
          <button className="border rounded-xl p-3 w-full">
            카카오 로그인
          </button>
        </div>
        <div className="mt-8 text-center">
          <span className="text-gray-400">
            회원이 아니신가요?{" "}
            <a href="/signup" className="border-b">
              회원가입하기
            </a>
          </span>
        </div>
      </div>
    </div> // wrapper
  );
}
