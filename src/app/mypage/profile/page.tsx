// src/app/mypage/profile/page.tsx
"use client";

// components/SideMenu 경로 /mypage/profile

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

const wrapper = "m-2";

export default function Profile() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className={wrapper}>
      <div className="mb-6">
        <h2>내 정보</h2>
        <p>닉네임과 비밀번호를 수정하실 수 있습니다.</p>
      </div>
      <form>
        <Input
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="전유성"
          className="mb-6"
        />
        <Input
          label="이메일"
          value={email}
          className="mb-6"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPasswordToggle
          className="mb-6"
        />
        <Input
          label="비밀번호 확인"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          showPasswordToggle
          className="mb-6"
        />
      </form>
      <div className="flex justify-center">
        <Button label="저장하기" className="py-3 px-10" />
      </div>
    </div>
  );
}
