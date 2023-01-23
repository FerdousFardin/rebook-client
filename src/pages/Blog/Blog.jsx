import { motion } from "framer-motion";
import { ScrollRestoration } from "react-router-dom";
import ScrollProgress from "../../components/ScrollProgress/ScrollProgress";
export default function Blog() {
  return (
    <motion.section
      className="bg-white dark:bg-gray-900 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ delay: 0.25 }}
    >
      <ScrollProgress />
      <div className="container px-6 py-10 mx-auto">
        <h1
          id="restore-blog"
          className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white"
        >
          From the blog
        </h1>

        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <img
            className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/how-to-manage-state-react.png"
            alt=""
          />

          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <a
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl"
            >
              What are the different ways to manage a state in a React
              application?
            </a>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              In React apps, there are at least seven ways to handle the state.
              Let us briefly explore a few of them in this part. URL 1. We can
              use URL to store some data e.g., 2. The id of the current item,
              being viewed, 3. Filter parameters Pagination offset and limit
              Sorting data Web Storage The second option is to store the state
              in the browser via web storage. This is useful when we want to
              persist state between reloads and reboots. Examples include
              cookies, local storage, and IndexedDB. These are native browser
              technologies. Data persisted in the browser is tied to a single
              browser. So, if the user loads the site in a different browser,
              the data will not be available. Local State The third option is to
              use store state locally. It is useful when one component needs the
              state. Examples include a toggle button, a form, etc. Lifted State
              The Fourth option is to define the state in the parent component.
              Often, the same state is used across multiple components. In those
              cases, it is useful to lift the state to a common parent. The
              lifting state is a two‑step process. First, we declare the state
              in a common parent component, and then we pass the state down to
              child components via props.
            </p>

            <a
              href="https://blog.saeloun.com/2021/11/11/8-ways-to-handle-react-state-part1.html"
              className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
            >
              Read more
            </a>

            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                  Amelia. Anderson
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <img
            className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            src="https://www.educative.io/cdn-cgi/image/f=auto,fit=contain,w=1200/api/page/6187859468877824/image/download/5404262147293184"
            alt=""
          />

          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <a
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl"
            >
              How does prototypical inheritance work?
            </a>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              Everything in Javascript is an object. Even when creating a Class
              is an Object via an Object Literal or Constructor Function. This
              is how Javascript does class-based programming as to other
              traditional Object-Oriented Programming languages where they use
              the keyword ‘class’ and ‘inheritance’. // Javascript’s version of
              class-based programming and other traditional class-based
              programming languages work with the same concept but does not work
              exactly similar. There are differences in its keyword, syntax, and
              how it works. There are also debates regarding pros and cons of
              Javascript’s version of class-based programming, but for
              simplicity’s sake and learning purposes, I do not want to go over
              those issues. // So, the core idea of Prototypal Inheritance is
              that an object can point to another object and inherit all its
              properties. The main purpose is to allow multiple instances of an
              object to share common properties, hence, the Singleton Pattern.
            </p>

            <a
              href="https://2ality.com/2011/11/javascript-classes.html"
              className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
            >
              Read more
            </a>

            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                  Amelia. Anderson
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <img
            className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2012/11/Unit-Testing.png"
            alt=""
          />

          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <a
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl"
            >
              What is Unit testing? How does it work?
            </a>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              Unit testing is a software development process in which the
              smallest testable parts of an application, called units, are
              individually and independently scrutinized for proper operation.
              This testing methodology is done during the development process by
              the software developers and sometimes QA staff. The main objective
              of unit testing is to isolate written code to test and determine
              if it works as intended. A unit test typically comprises of three
              stages: plan, cases and scripting and the unit test itself. In the
              first step, the unit test is prepared and reviewed. The next step
              is for the test cases and scripts to be made, then the code is
              tested.
            </p>

            <a
              href="https://www.techtarget.com/searchsoftwarequality/definition/unit-testing#:~:text=The%20main%20objective%20of%20unit,find%20in%20later%20testing%20stages."
              className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
            >
              Read more
            </a>

            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                  Amelia. Anderson
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <img
            className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            src="https://iotvnaw69daj.i.optimole.com/cb:n2y9~6666f/w:1450/h:740/q:mauto/f:avif/https://www.codeinwp.com/wp-content/uploads/2019/01/angular-vs-vue-vs-react.jpg"
            alt=""
          />

          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <a
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl"
            >
              Angular vs React vs Vue
            </a>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              <ol>
                <li>
                  <strong> React</strong>
                  <ul>
                    <li>
                      React is the JavaScript library of User Interfaces. It is
                      build single-page applications and also allows you to
                      create reusable UI components.
                    </li>
                    <li>
                      Popularity – React has gained a lot of popularity in
                      recent years and is considered one of the best frameworks
                      for web development. There are more developers who keep
                      React as a priority for creating wonderful websites.
                    </li>
                    <li>
                      Architecture – It does not follow any specific pattern,
                      developers have the freedom to choose any design pattern.
                      It begins with a single root component. Each can be nested
                      with another component.{" "}
                    </li>
                    <li>
                      Ecosystem – React has excellent open-source packages that
                      could be used for developing applications. Front-end
                      applications rely on global state management (Redux) used
                      to store information
                    </li>
                    <li>
                      Features – React follows the “Learn Once, Write Anywhere”
                      feature which helps developers to integrate new features
                      without the need of rewriting the existing code. It also
                      has declarative views for each state which will
                      efficiently update and render the components as per the
                      change in data. It has virtual DOM{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Angular</strong>
                  <ul>
                    <li>
                      Angular, developed by Google, was released in the year
                      2010. It is a TypeScript-based framework that uses a
                      regular DOM. Angular provides a set of tools using which a
                      complex, reactive UI can be built.{" "}
                    </li>
                    <li>
                      Popularity – Angular is used by Google, Upwork, and MS
                      Office and since this framework was implemented before
                      React, it is more popular providing a highly functional
                      framework to create larger applications.
                    </li>
                    <li>
                      Architecture – Angular follows MVC (Model-View-Controller)
                      architecture, also you don’t have restrictions in
                      following only MVC architecture
                    </li>
                    <li>
                      Ecosystem – Angular also performs state management,
                      inspired by Redux in React. You can build cross-platform
                      mobile applications using NativeScript.
                    </li>
                    <li>
                      Features – The new version of Angular8 comes with immense
                      features such as it supports cross-platform, two-way data
                      binding, a set of directives, declarative UI, a real DOM,
                      CLI (Command Line Interface), and many more.{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Vue.js</strong>
                  <ul>
                    <li>
                      Vue was developed by a former Google employee and was
                      released in the year 2014. It was developed to make the
                      best version of Angular and make a custom tool. It is used
                      for developing single-page engaging and high-quality web
                      applications.{" "}
                    </li>
                    <li>
                      Popularity – Vue has become so popular these days and it
                      is one of the hottest topics in terms of technology.
                      Companies that use Vue as their front-end development
                      framework are UpWork, Netflix, and Nintendo. It has a good
                      rating on GitHub making it so popular.{" "}
                    </li>
                    <li>
                      Architecture – Vue is called a progressive framework where
                      you can extend functionality using third-party packages.
                      It follows the MVVM (Model View ViewModel) pattern but is
                      also not strictly linked to it.
                    </li>
                    <li>
                      Ecosystem – Vue comes with various libraries used for
                      creating a full-fledged UI. Vuex is the state management
                      library for Vue applications. To speed up your
                      development, it has input components and advanced elements
                    </li>
                    <li>
                      Features – Several features of Vue include two-way data
                      binding for HTML interface manipulation, virtual DOM to
                      update the changes made in the website quickly, custom
                      directives for managing data changes, components for
                      reusing codes, and transitions that provides methods when
                      a UI element is removed or inserted in the DOM.
                    </li>
                  </ul>
                </li>
              </ol>
            </p>

            <a
              href="https://www.codeinwp.com/blog/angular-vs-vue-vs-react/#:~:text=Vue%20provides%20higher%20customizability%20and,two%20is%20an%20easy%20option."
              className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
            >
              Read more
            </a>

            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt=""
              />

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">
                  Amelia. Anderson
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </motion.section>
  );
}
