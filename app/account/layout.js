import SideNavigation from "@/app/_components/SideNavigation";

// here we will give layout which will remain same for all 3 routes , /account, /account/reservations, /account/profile
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
