import { Link } from "react-router-dom"


function TopBar() {
  return (
    <div className="top">
    <p>Created by Cecilia Torreira </p>
   <span><Link to={"https://www.linkedin.com/in/ceciliatorreira/"}><img width={20} height={20} src="/pictures/linkedin.png" alt="Linkedin"/></Link>
     <Link to={"https://github.com/CeciliaTorreira"}><img width={20} height={20} src="/pictures/github.png" alt="Github"/></Link></span>
   </div>
  )
}

export default TopBar