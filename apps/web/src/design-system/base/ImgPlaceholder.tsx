import Image from "next/image";

import tempPic from "../../../public/placeholder/placeholder-img.jpg";

export const PlaceholderImg = () => <Image src={tempPic} alt="" className="fr-fluid-img" />;
