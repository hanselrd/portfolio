import React, { Component } from 'react';
import '../../styles/CV.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { Helmet } from 'react-helmet';

class CV extends Component {
  render() {
    return (
      <div className="CV">
        <Helmet>
          <title>Curriculum Vitae | Hansel De La Cruz</title>
        </Helmet>
        <div style={{ textAlign: 'center' }}>
          <h1>Hansel De La Cruz</h1>
          <p>
            Website:{' '}
            <a
              href="https://hanseldelacruz.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              hanseldelacruz.com
            </a>
          </p>
          <p>
            E-mail:{' '}
            <a href="mailto:hansel_delacruz@student.uml.edu">
              hansel_delacruz@student.uml.edu
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              href="https://github.com/hanselrd"
              target="_blank"
              rel="noopener noreferrer"
            >
              hanselrd
            </a>
          </p>
          <p>
            LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/hansel-de-la-cruz-532199144"
              target="_blank"
              rel="noopener noreferrer"
            >
              hansel-de-la-cruz-532199144
            </a>
          </p>
        </div>
        <hr />

        <h2>EDUCATION</h2>
        <ul>
          <li>
            <p>
              University of Massachusetts Lowell <em>(Lowell, MA)</em>
            </p>
            <p>Bachelors of Science in Computer Science, expected May 2018</p>
          </li>
        </ul>
        <h2>SKILLS</h2>
        <ul>
          <li>
            <p>
              C, C++, JavaScript, TypeScript, HTML, CSS, Python, PHP, C#, Java,
              Golang
            </p>
          </li>
          <li>
            <p>
              Comfortable with Angular(JS/2+) and familiar with React and Vue
            </p>
          </li>
          <li>
            <p>Fluent in Spanish</p>
          </li>
        </ul>
        <h2>PROJECTS</h2>
        <ul>
          <li>
            <p>
              <strong>Portfolio</strong> <em>(under development)</em>
            </p>
            <p>
              Repository:{' '}
              <a
                href="https://github.com/hanselrd/portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/hanselrd/portfolio
              </a>
            </p>
            <p>
              Live Demo:{' '}
              <a
                href="https://hanseldelacruz.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                hanseldelacruz.com
              </a>
            </p>
            <p>
              This project is the website you are on currently. I've been
              developing this website on my free time to serve as a way for
              employers and others to see my work and get in contact with me. At
              first I had the idea of creating my own blog but I wanted to do so
              much more.
            </p>
          </li>
          <li>
            <p>
              <strong>Lotus</strong> <em>(under development)</em>
            </p>
            <p>
              Repository:{' '}
              <a
                href="https://github.com/hanselrd/lotus"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/hanselrd/lotus
              </a>
            </p>
            <p>
              Live Demo:{' '}
              <a
                href="https://lotus.hanseldelacruz.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                lotus.hanseldelacruz.com
              </a>
            </p>
            <p>
              This project is being developed on my free time alongside{' '}
              <em>Portfolio</em>. The goal is to create a web-based application
              using <em>Angular</em> and <em>Firebase</em>'s authentication API
              to allow users to traditionally sign up or log in using their
              social media. I am also using <em>Firebase</em>'s{' '}
              <em>Cloud Firestore</em> to store data efficiently without writing
              a single line of backend code.
            </p>
          </li>
          <li>
            <p>
              <strong>Energy Helper</strong> <em>(November 4-5, 2017)</em>
            </p>
            <p>
              Repository:{' '}
              <a
                href="https://github.com/hanselrd/energy-helper"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/hanselrd/energy-helper
              </a>
            </p>
            <p>
              Live Demo:{' '}
              <a
                href="https://energyhelper.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                energyhelper.org
              </a>, if not working try:{' '}
              <a
                href="https://goo.gl/Nmfss1"
                target="_blank"
                rel="noopener noreferrer"
              >
                goo.gl/Nmfss1
              </a>
            </p>
            <p>
              This project was developed as an entry for{' '}
              <em>America East Hackathon 2017</em> in under 24 hours by myself
              alongside three other collaborators. We created a simple web-based
              tool that could be used to upload your energy bill or manually
              enter data to provide consumers with effective tips on how to save
              on their energy bills. We used Google Assist to provide a personal
              energy auditor that can safely be activated from your computer or
              mobile device. We won best beginner hack as it was our first{' '}
              <em>America East Hackathon</em>.
            </p>
          </li>
          <li>
            <p>
              <strong>Bubble Warrior Adventures</strong> <em>(Spring 2017)</em>
            </p>
            <p>
              Repository:{' '}
              <a
                href="https://github.com/hanselrd/bubble-warrior-adventures"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/hanselrd/bubble-warrior-adventures
              </a>
            </p>
            <p>
              This project was developed by myself alongside two of my peers. I
              served as team leader and we used agile development to organize
              meetings and plan sprints. We developed a game in <em>C++</em>{' '}
              that dynamically loads in maps using <em>Tiled</em>'s{' '}
              <em>.tmx</em> format and uses <em>Python</em> as its scripting
              language to create a simple API for creating NPCs.
            </p>
          </li>
        </ul>
        <h2>EXTRACURRICULAR</h2>
        <ul>
          <li>
            <p>
              <strong>America East Hackathon</strong>, University of
              Massachusetts Lowell <em>(November 4-5, 2017)</em>
            </p>
            <p>
              Spent 24 hours developing <em>Energy Helper</em> with a team of
              friends. We won best beginner hack and got cool medals to prove
              it!
            </p>
          </li>
          <li>
            <p>
              <strong>Salesforce Hackathon</strong>, Harvard University{' '}
              <em>(October 14, 2017)</em>
            </p>
            <p>
              Spent a whole day meeting great people at{' '}
              <em>Hardvard University</em> during this <em>Hackathon</em>. We
              were tasked with creating a <em>Tinder</em>
              clone for pets using <em>Salesforce</em>.
            </p>
          </li>
          <li>
            <p>
              <strong>Clarendon Family Day Care</strong>, Lowell, MA{' '}
              <em>(September 2014 - Present)</em>
            </p>
            <p>
              Serve as a tutor for children that need help completing their
              homework and teach underprivileged children how to use a computer
              by giving lessons on my laptop. Some day I wish to start a
              fundraiser to help these children buy their first computer.
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CV);
