export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

 return (
   <div className="min-h-screen bg-black text-white flex">
     <h1 className="text-5xl font-bold mb-10">
       Profile
       <hr className="border-gray-700 my-4" />
       <p className="text-gray-400 text-lg">
         Welcome to your profile page! Here you can view and manage your account
         information, update your settings, and access personalized features.
         <span className="text-2xl">Your user ID is: {id}</span>
       </p>
     </h1>
   </div>
 );
} 


