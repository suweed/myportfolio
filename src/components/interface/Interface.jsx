import { motion  } from 'framer-motion';
import { useAtom } from 'jotai';
import { currentProjectAtom, projects } from '../Projects';
import { Form } from './Form';
import { BtnNetworks } from './BtnNetworks';
import { TitleAbout } from './TitleAbout';

const skills = [
    {
        title: "Javascript / jQuery",
        level: 80
    },
    {
        title: "HTML / CSS / LESS",
        level: 90
    },
    {
        title: "PHP / Magento",
        level: 85
    },
    {
        title: "React",
        level: 20
    },
    {
        title: "Three Fiber",
        level: 20
    } 
];

const languages = [
    {
        title: "Español",
        level: 100
    },
    {
        title: "Inglés",
        level: 40
    }
];

const Section = (props) => {
    const { children, mobileTop } = props;
    
    return (
        <motion.section
        className={
        `h-screen w-screen pt-36 max-w-screen-2xl mx-auto
        flex flex-col items-start
        ${mobileTop ? "justify-start md:justify-start p-0 pr-0" : "justify-start p-8 pr-12"}
        `}
        initial={{
            opacity: 0,
            y: 50
        }}
        whileInView={{
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.6
            }
        }}>
            {children}
        </motion.section>
    )
}

const waitForElementToExist = (selector)  =>{
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }
      
      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });
      
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });
}

const consoleTextAnimation = (words, colors, section, menuOpened) => {
    if (section !== 0 || menuOpened) {
        document.querySelectorAll(".console-container").forEach(element => {
            element.remove();
        })
    }

    if (section === 0) {
        waitForElementToExist('.name-titles').then(target => {
            let consoleContainer = '<div class="console-container">';
                consoleContainer += '<span id="text"></span>';
                consoleContainer += '<div class="console-underscore" id="console">&#95;</div>';
                consoleContainer += '</div>';
            target.insertAdjacentHTML('beforeend', consoleContainer);
        });

        waitForElementToExist('#text').then(target => {
            if (colors === undefined) colors = ['#fff'];
            var letterCount = 1;
            var x = 1;
            var waiting = false;

            target.setAttribute('style', 'color:' + colors[0]);
            window.setInterval(function() {
                if (letterCount === 0 && waiting === false) {
                    waiting = true;
                    target.innerHTML = words[0].substring(0, letterCount)
                    window.setTimeout(function() {
                        var usedColor = colors.shift();
                        colors.push(usedColor);
                        var usedWord = words.shift();
                        words.push(usedWord);
                        x = 1;
                        target.setAttribute('style', 'color:' + colors[0])
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (letterCount === words[0].length + 1 && waiting === false) {
                    waiting = true;
                    window.setTimeout(function() {
                        x = -1;
                        letterCount += x;
                        waiting = false;
                    }, 1000)
                } else if (waiting === false) {
                    target.innerHTML = words[0].substring(0, letterCount)
                    letterCount += x;
                }
            }, 120);
        });

        waitForElementToExist('#console').then(conElement => {
            let visible = true;
            window.setInterval(function() {
                if (visible === true) {
                    conElement.className = 'console-underscore hidden'
                    visible = false;
                } else {
                    conElement.className = 'console-underscore'
                    visible = true;
                }
            }, 400);
        });
    }
}

const AboutSection = (props) => {
    const { section, setSection, menuOpened } = props;

    consoleTextAnimation(['Front-end', 'Back-end', 'Full-Stack'], ['tomato','rebeccapurple','lightblue'], section, menuOpened)

    return (
        <>
        <Section mobileTop>
            <TitleAbout />
            <motion.div
                className='w-full text-right content-dev-style mt-16 md:mt-0 ml-5 md:ml-20'
                initial={{
                    opacity: 0,
                    y: 25
                }}
                whileInView={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1,
                    delay: 1.5
                }}
            >
                <div className="text-lg text-gray-600 mt-4">
                    <span className='content_name-titles'>Desarrollador -&gt; <span className='name-titles'></span></span>
                </div>
            </motion.div>
            <div className='w-full text-right content-btn-contactme mt-10 md:mt-0'>
                <div class="container-btns mt-10 mb-5">
                    <motion.button
                        onClick={() => setSection(3)}
                        className={`btn w-48 h-16 py-4 px-8 rounded-lg font-bold text-lg mt-4 mr-24 mb-6`}
                        initial={{
                            opacity: 0,
                            y: 25
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 2.5
                        }}
                    >
                        <a
                            href="#"
                            className={`w-full h-full justify-center p-6 top-0 left-0 overflow-hidden absolute text-center`}
                        >
                            Contactame
                        </a>
                    </motion.button>
                </div>
            </div>
        </Section>
        </>
    )
}

const SkillsSection = () => {
    return (
        <Section>
            <motion.div className='w-full' whileInView={"visible"}>
                <div cursor-class="arrow" className='w-full md:w-1/4'>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
                    <div className="w-full md:w-64 mt-8 space-y-4">
                        {skills.map((skill, index) => (
                            <div className="w-full md:w-72" key={index}>
                                <motion.h3
                                    className="text-lg md:text-xl font-bold text-gray-100"
                                    initial={{
                                        opacity: 0
                                    }}
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 1 + index * 0.2
                                            }
                                        }
                                    }}
                                    >{skill.title}
                                </motion.h3>
                                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                    <motion.div
                                        className="h-full bg-cyan-600 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                        initial={{
                                            scaleX: 0,
                                            originX: 0
                                        }}
                                        variants={{
                                            visible: {
                                                scaleX: 1,
                                                transition: {
                                                    duration: 1,
                                                    delay: 1 + index * 0.2
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <motion.div className='w-full' whileInView={"visible"}>
                <div cursor-class="arrow" className='w-full md:w-1/4' >
                    <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">Lenguajes</h2>
                    <div className="w-full md:w-64 mt-8 space-y-4">
                        {languages.map((lng, index) => (
                            <div className="w-full md:w-72" key={index}>
                                <motion.h3
                                    className="text-lg md:text-xl font-bold text-gray-100"
                                    initial={{
                                        opacity: 0
                                    }}
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 2 + index * 0.2
                                            }
                                        }
                                    }}
                                    >{lng.title}
                                </motion.h3>
                                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                    <motion.div
                                        className="h-full bg-cyan-600 rounded-full"
                                        style={{ width: `${lng.level}%` }}
                                        initial={{
                                            scaleX: 0,
                                            originX: 0
                                        }}
                                        variants={{
                                            visible: {
                                                scaleX: 1,
                                                transition: {
                                                    duration: 1,
                                                    delay: 2 + index * 0.2
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    )
}

const ProjectsSection = () => {
    const [ currentProject, setCurrentProject ] = useAtom(currentProjectAtom);

    const nextProject = () => {
        setCurrentProject((currentProject + 1) % projects.length);
    }

    const previousProject = () => {
        setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    }
    
    return (
      <Section>
        <motion.div whileInView={"visible"}>
            <div className="flex w-full ml-2 md:ml-20 mt-80 md:mt-96 h-full gap-8 items-center justify-center text-white">
                <button
                    cursor-class="arrow"
                    className="hover:text-indigo-600 transition-colors"
                    onClick={previousProject}
                >
                    <div class="arrow-left"></div>
                </button>
                <h2 cursor-class="arrow" className="text-3xl md:text-5xl font-bold">Experiencia</h2>
                <button
                    cursor-class="arrow"
                    className="hover:text-indigo-600 transition-colors"
                    onClick={nextProject}
                >
                    <div class="arrow-right"></div>
                </button>
            </div>
        </motion.div>
      </Section>
    );
};

const ContactSection = (props) => {
    const { section, setSection } = props;
    
    return (
        <Section>
            <Form />
            <BtnNetworks section={section} />
        </Section>
    )
}

export const Interface = (props) => {
    const { section, setSection, menuOpened } = props;
    
    return (
        <div className="flex flex-col items-center w-screen">
            <AboutSection section={section} setSection={setSection} menuOpened={menuOpened} />
            <SkillsSection section={section} setSection={setSection} />
            <ProjectsSection section={section} setSection={setSection} />
            <ContactSection section={section} setSection={setSection} />
        </div>
    )
}