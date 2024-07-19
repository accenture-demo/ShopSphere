import { Typography } from "@material-tailwind/react";
 
const data = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Our Team", "Projects"],
  },
  {
    title: "Help Center",
    links: ["Discord", "Twitter", "GitHub", "Contact Us"],
  },
  {
    title: "Resources",
    links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
  },
  {
    title: "Products",
    links: ["Templates", "UI Kits", "Icons", "Mockups"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export function Footer() {
  return (
    <div className="bg-gray-800 p-10 flex justify-around  w-full " >
        {data.map((d,index) =>(
          <div key={index} className="text-center text-white  cursor-pointer">
            <div className="text-white font-bold mb-5 cursor-pointer hover:text-blue-600  ">{d.title}</div>
            {d.links.map((list , ind)=>(
              <div key={ind} className="font-light p-1 hover:text-green-400">{list}</div>
            ))}
            </div>
        ))}
    </div>
  );
}