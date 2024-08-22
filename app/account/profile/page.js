import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();

  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
        {/* The above <SelectCountry /> component is a server component because it is fetching data from a country API which gives 
            back all the countries as a response and it is a async await , So we have to render this <SelectCountry /> component 
             on the server because it is a server component as it fetches outside countries data using a country API but if you see 
             this component is a child component of the UpdataProfileForm.js component which is a client component but the child of this
             client component is a server component but according to the rules of next.js framework the children of client
              components will be client components . So how do we fix this ?  The only way which we can render a server component
            inside a client component is by passing it as a prop  */}
      </UpdateProfileForm>
      {/* <UpdateProfileForm> is a client component , So we are passing <SelectCountry /> component which is a server component
       by passing it as a child prop to the <UpdateProfileForm> component */}
    </div>
  );
}
