import { AiOutlineArrowDown } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";

export default function Home() {
  return (
    <div className="relative">
      <img className="w-[100vw] h-[100vh] object-cover" src="/earth.jpg" />
      <div className="absolute w-[100vw] h-[100vh] top-0 flex flex-col justify-center p-10 items-start font-bold text-gray-300 text-5xl font-mono">
        <div className="flex items-center mb-2">
          <HiLocationMarker className="mr-2 text-3xl text-red-500" />
          <span>Prodemic</span>
        </div>
        <span className="text-xs px-10 w-96 mb-4">
          A virus of positive thought created and mutated by every recipient who
          receives it. Turning our global network into an evolutionary function
          for the best piece of text imaginable. A quest for the holy grail of
          vibes.
        </span>
        <div className="flex px-10">
          <a
            href="#"
            className="bg-green-500 text-white flex items-center text-xs p-2 mr-2 rounded-md"
          >
            <AiOutlineArrowDown className="mr-1" /> Article
          </a>
          <a
            href="#"
            className="bg-orange-500 text-white flex items-center text-xs p-2 rounded-md"
          >
            <MdModeEditOutline className="mr-1" /> Edit
          </a>
        </div>
      </div>
      <div className="flex p-10">
        <div className="flex flex-col items-center w-1/4">
          <span>Introduction</span>
          <AiOutlineArrowDown />
          <span>Why Now?</span>
          <AiOutlineArrowDown />
          <span>The Plan</span>
        </div>
        <div className="w-3/4">
          <span>Introduction</span>
          <span>
            We used to have faith in the frontier. We would become pioneers and
            colonize distant worlds. Today, we live in the dusk of these
            ambitions. Technology, in which we placed our hopes, has been used
            to vanquish our holy desires with broadcasts of distraction on a
            billion screens.
            <br />
            Instead of purpose, we find artificial dopamine and overconsumption.
            Despite economic prosperity, we are confronted with alienation, loss
            of institutional trust, and withdrawal from public life. There is a
            god shaped hole at the heart of our culture, a an invisible nihilism
            that robs us.
            <br />
            We need a new sense of purpose. The experience of the pandemic
            ruptured our sense of normalcy and led us to reconsider our way of
            life. The reconfiguration of our relationships over the Internet
            hinted that new modes of social organization were possible. With
            this opportunity in hand, we must ask ourselves: what should we
            align for?
            <br />
            The quest for the holy grail offers an answer. We want to live in a
            world that give us a sense of ownership and belonging, with people
            who share our values and dreams. We will find purpose in a quest to
            build a new culture founded on an old insight: that in the final
            analysis, all moral systems, social systems, and political systems
            are judged by the vitality they produce in a people.
            <br />
            With this moral primitive as our compass, we set out on the quest
            for the holy grail of vibes. The holy grail of vibes is a
            representation of that qualia which most clearly and effectively
            fills that god shaped hole within us. It is that holy essence of
            vibes that week to uncover.
            <br />
            For individuals, it will spread strength, and virtue. For society,
            it will align the horizons of art, commerce, and technology around
            holiness.
          </span>
          <span>Why Now?</span>
          <span>
            Crafting the holiest vibe with input from every person on the globe
            used to be impossible. The core issue was a lack of connectivity,
            holy texts of the past struggled to cross the oceans or the walls of
            the empire they lived in. Each holy text filled the believers in
            with faith, but in an attempt to hold tight the collective
            narrative, denounced the continual search for holiness. At the time,
            global communication was impossible. Beliefs systems were spread on
            the physical plane. Today we have digitized our thoughts and
            personal lives and we have a new opportunity to collectively
            participate in the writing of a positive global narrative and
            philosophy for mankind. A universal philosophy that has no single
            prophet, no walls, and that can change with the times as the world
            sees fit.
            <br />
            John Winthrop, the founder of Boston, once preached: “For we must
            consider that we shall be as a city upon a hill. The eyes of all
            people are upon us.” Even from the beginning, they sensed the
            magnitude of their purpose. How do we live up to this example? How
            will our descendants see us? Only great projects, continued in their
            same spirit, can answer. We do not aim for small ends, but to move
            the world.
            <br />
            The coronavirus taught us that when we are so interconnected, bad
            things spreading can change the entire working flow of humanity at
            large. What if we focused on maximizing the spread of something
            positive? What if we changed the course of humanity with a few taps
            of our fingers?
            <br />
            With the internet in our hands we have the opportunity to do the
            opposite of the virus. To spread from person to person an anti-virus
            made up of the very words you are reading here.
          </span>
          <span>The Plan</span>
        </div>
      </div>
    </div>
  );
}
