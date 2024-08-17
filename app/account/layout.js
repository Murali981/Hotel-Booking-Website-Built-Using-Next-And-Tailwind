// The above layout.js is inside the account folder whose route is localhost:3000/account , So this layout.js will be
// applied for all the nested routes starting with "localhost:3000/account/*" and the "*" can be any child route but the parent
// route is fixed which is localhost:3000/account.

import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
      {/* The most important thing we need to keep in mind is , that we receive the children basically that's on the same level
       in our file structure And so in this case this page.js(whose route is localhost:3000/account/page.js) and all the nested 
        page.js (whose route are localhost:3000/account/profile/page.js and localhost:3000/reservations/page.js) will become 
         the children of this layout (whose path is app->account->layout.js) */}
    </div>
  );
}
