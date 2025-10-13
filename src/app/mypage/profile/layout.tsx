// src/app/mypage/layout.tsx

import SideMenu from "@/components/SideMenu";
import GNB from "@/components/GNB";
import Footer from "@/components/Footer";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB />
      <div className="w-screen h-screen flex mt-20 justify-center">
        <div className="flex gap-5">
          <aside className="w-[290px]">
            <SideMenu />
          </aside>
          <main className="flex-1 w-[640px] p-4">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
