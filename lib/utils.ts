import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface InfluenceItem {
  title: string;
  description: string;
  imageUrl: string;
}
export const influences = [
  {
    id: 1,
    title: "Peers",
    description:
      "If your friends view drug use as normal or acceptable, you may be more likely to adopt a similar mindset. The desire to fit in can further reinforce this influence, pushing you toward or away from drugs depending on the group’s attitudes.",
    icon: "/carousels/item1.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 2,
    title: "Partner",
    description:
      "Relationships are deeply personal, and a partner’s influence can be even stronger than that of peers. A partner who firmly opposes or supports drug use can significantly shape your perspective over time.",
    icon: "/carousels/item2.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 3,
    title: "Movies/TV",
    description:
      "Movies and TV often depict drug use as glamourous, rebellious, or a symbol of success, sometimes ignoring addiction or consequences. These portrayals can subconsciously make drug use seem more acceptable or desirable.",
    icon: "/carousels/item3.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 4,
    title: "Music",
    description:
      "Music can evoke strong emotions, making listeners more receptive to the messages in the lyrics. Additionally, when popular artists normalise drug use, fans may be influenced by their choices, often viewing them as role models.",
    icon: "/carousels/item4.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 5,
    title: "Social Media",
    description:
      "Frequent exposure to normalised drug use on social media can lead users to perceive it as more common or less harmful than it truly is. When popular influencers and celebrities downplay the negative consequences, they further distort these perceptions.",
    icon: "/carousels/item5.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 6,
    title: "Books",
    description:
      "Like movies and TV shows, books often portray themes that show drug use as normal. Characters may use drugs casually, with little consequence, making it seem less harmful. By romanticising addiction or using drugs for plot development, books can subtly reinforce the idea that drugs may be acceptable.",
    icon: "/carousels/item6.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 7,
    title: "Overseas",
    description:
      "The excitement of being overseas can increase the temptation to experiment with drugs, especially in places where drug use is more socially accepted. A new environment, the desire to escape stress, and the anonymity of being in a foreign country can all shift how you view drugs.",
    icon: "/carousels/item7.png?height=80&width=80",
    color: "#FF4D4D",
  },
  {
    id: 8,
    title: "Nightlife",
    description:
      "The nightlife culture can heighten the likelihood of experimenting with drugs. The atmosphere of clubs, bars, and parties, often fueled by alcohol, lowers inhibitions and fosters a desire to escape reality. Peer pressure to fit in can also drive people to try drugs, especially when others are using to enhance the experience.",
    icon: "/carousels/item8.png?height=80&width=80",
    color: "#4DA6FF",
  },
  {
    id: 9,
    title: "Music Festival",
    description:
      "The high-energy atmosphere of festivals, with loud music and vibrant visuals, can make drugs seem like a way to enhance the experience and boost feelings of connection. The sense of freedom at festivals may also encourage experimentation as a way to escape stress or bond with others.",
    icon: "/carousels/item9.png?height=80&width=80",
    color: "#FF4D4D",
  },
];


export const events = [
  {
    id: 1,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-1.png",
    upcoming: true,
  },
  {
    id: 2,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-2.png",
    upcoming: true,
  },
  {
    id: 3,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-3.png",
    upcoming: false,
  },
  {
    id: 4,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-4.png",
    upcoming: false,
  },
  {
    id: 5,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-1.png",
    upcoming: true,
  },
  {
    id: 6,
    title: "The Trip: An Escape Room Experience",
    image: "/events-images/event-2.png",
    upcoming: false,
  },
]