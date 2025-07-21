import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills } from "../constants";

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Srinidhi Chitti
        </span>{" "}
        👋
      </h1>

      <p className="mt-5 text-slate-600 leading-relaxed max-w-3xl">
        I’m someone who loves learning and building applications, specializing in
        technical education through hands-on development and real-world problem solving.
      </p>

      {/* Skills */}
      <div className="py-10">
        <h3 className="subhead-text mb-10">My Skills</h3>
        <div className="flex flex-wrap gap-8">
          {skills.map((skill) => (
            <div className="block-container w-20 h-20" key={skill.name}>
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <p className="mt-4 text-slate-600 max-w-3xl">
          From collaborating with amazing teams to leveling up my skills — it's been quite a ride! Here's a snapshot of my journey:
        </p>

        <div className="mt-12">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px solid " + experience.iconBg,
                  boxShadow: "none",
                  background: "#fff",
                }}
              >
                <div>
                  <h3 className="text-xl font-semibold text-black font-poppins">
                    {experience.title}
                  </h3>
                  <p className="text-base font-medium text-slate-700 mt-1">
                    {experience.company_name}
                  </p>
                </div>

                <ul className="mt-4 list-disc list-inside space-y-2">
                  {experience.points.map((point, idx) => (
                    <li
                      key={`experience-point-${idx}`}
                      className="text-sm text-slate-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="my-10 border-slate-300" />

      <CTA />
    </section>
  );
};

export default About;
