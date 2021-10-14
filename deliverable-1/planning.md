# NAHDET EL MAHROUSA
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details

#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.

Our product is a website that helps early-stage startup entrepreneurs by providing valuable guidance and advice to them from different perspectives based on their current situation. It offers free legal and financial advice to these entrepreneurs since many early-stage entrepreneurs might not have enough financial support to afford to pay for financial consultations.

In order for the advice to get straight to the point, users need to answer a series of questions about their startup idea or their existing startup. For instance, our questions are multiple-choice and users will be matched to different advice depending on which option to the question they select. Therefore, our product aims to provide customized legal, financial, and business advice pertaining to their specific situation.

Aside from our home page, we also have an administrative dashboard that provides access to common management tasks for updates. For example, administrators are able to add, remove, and to revise questions and their corresponding options. Our administrative dashboard also serves as a place to record and display user statistics collected from the entrepreneurs. Statistics may include: visitors count; where the visitors are from; which questions and categories of questions are picked by the most users; visitors from which area focus on what problems and are working on which sectors.

Mockup: <https://www.figma.com/file/TmGYB8Q4o6dPayLtac8czI/D1-Mockup>

#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free to use personas. You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**

 Personas # 1:
 ***Joshua*** is senior year Egyptian student at University of Toronto for CS Specialist. Joshua has a great idea about building a mobile application that would made significant improvement in the IT industry. Unfortunately, Joshua have to work for living after graduation so he will barely have time to build the app, unless he could find an investor who could give him financial support for his app.

 Personas # 2:
 ***Thomas*** is a truck driver and he has been work in the shipping industry for 20 years. Thomas knew how the industry work, so he decided to use his savings to start his own shipping company. However, Thomas only knows about shipping process but have no clue about how to start a business. Thomas found out that he need to submit many legal papers to the government which he never heard before. Thus, Thomas want to find a reliable agency or lawyer for help.

 Personas # 3:
 ***Noha*** is a program manager for educational programs and she would like to start up an organization which provide informal education for children and teenagers(4 - 16 years old), she wants to serve underprivileged young females. However, informal education is still an underdeveloped concept and yet to be accept by the public . Although she thinks that this type of startups have a great potential, her family disagree and give her a hard time as she decide to quite her current dream for something unrealistic. 

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly.
    * Save users time:
    Instead of searching up on google, and go through pages of all different kinds of unrelated and disturbing information, user can follow the bot's questions to locate their questions and find *organized* and *analyzed* information provided by our partner that best fit to their situation and concern. For people in rural area, our app provide accessibility such that they do not need to call or travel to where our partner is located to ask for help.
    For admin, our partners no more need to make a lot of surveys and can easily get information from our analytics.

    * Allow users to discover new information:
    Our app is essentially for providing information and answering questions about how to run a startup. This app will put the information that hides in government documents and other people's experience on the table.
    For admin dashboard, the admin can see detailed information of what topics are more concerned by which group of people. The app being online can be more accessible, so that people who previously did not contact our partner will have a chance to have their questions be seen by our partner.

    * Provide users with more accurate and/or informative data:
    The app will guide the user to realize their condition and locate their question, such that the provided answers are more related to the user. The answers and questions are provided by our partner, who has strong experience helping startups in the similar conditions.

    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    A similar app is [Osome Singapore](https://osome.com/sg/pricing/). Our app will focus more on answering users' questions instead of introducing a service. It will be more lightweight and quick for the users.

    * How does this align with your partner's organization's values/mission/mandate?
    Our partner wants to provide helps to startup companies, this app can help them dealing with easy and common questions; at the same time, provide more data about what the startups are concerning so that they can modify their strategies accordingly.

#### Q4: How will you build it?

> Short (1-2 min' read max)

* What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools.

We plan to use the popular MERN stack: MongoDB + Node.js + Express.js + React.

For backend, the app does not have complex features and can be implemented by basic RESTful APIs. Potential dependencies include mongoose, node-session, and other node modules.

For frontend, the main app can be implemented in a single page. However, it needs to store some data so that react-redux might be needed. Bootstrap may be needed for responsive design.

For admin dashboard, we plan to use [Ant Design](https://ant.design/) as the UI library since it is designed for React and can provide a lot of useful components. To further display statistics, we may use the [Recharts](https://recharts.org/en-US) library which has components to visualize data with simple inputs.

Since there is a need for Arabic language, [i18n](https://react.i18next.com/) may be needed for internationalization.

* How will you deploy the application?

Since the application has the demand of being used in Egypt, AWS might be what we expect in the final stage. However, in the earlier development stages, we will deploy on Heroku for its ease of use. CI/CD would be set up with GitHub Actions.

* Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here.

Since the project has a main app (advisor bot) and a admin dashboard, the software should be separated into at least three parts and a database: (1) frontend for advisor bot, (2) frontend for admin dashboard, (3) backend for both functionalities.

The app will decouple frontend and backend, and communicate through RESTful APIs. The frontend will follow [MVC architecture](https://medium.com/geekculture/react-js-architecture-features-folder-structure-design-pattern-70b7b9103f22). The backend will follow the Controllers+Services architecture as proposed in [this blog](https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development).

Design patterns that we will use include dependency injection and adapter to work with different environment. Database access should rely on DAO for easier manipulation when accessing statistics and testing.

Environments for each stage should be setup: DEV environment that runs locally is used for integration and testing; STAGING environment will be set up onto a server for further testing performance and new releases; and PROD environment that is given to the user. This means we should have two databases (one for DEV+STAGING and one for PROD) and a data mock for unit tests.

* Will you be using third party applications or APIs? If so, what are they?

There is the demand of collecting data of user behaviors, so that we may rely on Google Analytics API to provide data about users' behaviors in the app and users' data of locations. As an add-on feature, we may visualize the process of manipulating advisor questions&options, which the tools would be searched later.

* What is your testing strategy?

Each module will be assigned with a sub-team for cross-testing. DEV environment: unit tests should be done locally with mocks, integrated testings for each API should connect to a testing database. STAGING environment: integrated tests, performance tests, and UAT tests.

Positive, negative, and stressing tests should be designed before implementing functionalities by the developer and run after finishing each function; after that, the cross-testing team should review the test cases and add additional test cases if needed.

In feature branches, developers and cross-testers should implement and run unit tests after a function is finished; after a module is finished, integrated tests should be implemented and run. Passing all tests would allow the branch to be merge into DEV branch.

In DEV, re-run all unit tests and developers should build more complex integrated tests for their function modules. If all tests passed and enough features are implemented, the program can be released into STAGING.

In STAGING, the app should be tested in an environment similar to PROD. APIs should first be tested by Postman. Then, cross-testing teams should test features manually. If possible, performance tests can be implemented. If all tests passed, a test document with every test cases (positive, negative, stressing) for each feature should be created and the partner should be invited to test (UAT).

Possible testing tools include jest, react-testing-library, postman.

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
 * If you have a partner, these must be reviewed and accepted by them.

1. As a startup entrepreneur, 
I want to find an investor have interests with my business, 
So that I could get financial supports. 
Given I do not have enough money to start my business,
WHEN I go through the instructions about funding on the website,
THEN I know where to find financial supports or how to apply for government funding,

2. As a startup entrepreneur, 
I want to find a reliable agency or lawyer, 
So that I could prepare all legal papers required for my business.
Given legal documents are sent to my business.
WHEN I read through the brief explanation about legal documents in the FAQ,
THEN I unsterstand that are the papers asking and what should I say,

3. As a startup entrepreneur, 
I want to connect with previous startup entrepreneurs,
So that I could learn from their experience. 
Given I have a question and I do not know where to find the answer,
WHEN I find data about other entrepreneurs on the website
THEN I can avoid the mistakes they made and find the best path for me.

3. As a startup entrepreneur, 
I want to know what kind of preparations I need to do before I start up my business,
So that my business will be ready to start.
Given I do not know what is the local trend, 
WHEN I read through the preparation guidance on our website,
THEN I knew that I need to prepare before startups, include funds, certificates etc.

4 As a startup entrepreneur,
I want to have a proper business model with identified customer
So that I can specifically target my users.
Given I have no previous experience,
WHEN I asked for professional supports from the organization,
THEN I have the most fit business model for me.


5. As a Nahdet El Mahrousa employee, 
I want to know what the startup entrepreneurs are currently concerning
So that I can design services accordingly.
Given I have no clue how to gather information about these entrepreneurs,
WHEN I look at the statistics in the admin dashboard,
THEN I will see which of our customers' problems is the most urgent to be resolved.

----
## Intellectual Property Confidentiality Agreement 
> Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please contact David and Adam.
>  
**By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:

1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual. 
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.

**Briefly describe which option you have agreed to. Your partner cannot ask you to sign any legally binding agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

We agreed that the software can be open-source, but data, including statistics and authentication information, should remain secure and private to the partner.

1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Our project has two parts. One is for the advisor bot and the other is for the admin dashboard. Based on this, our team can be divided into two groups where each group takes responsibility for one page. Within each group, we can have one person as a frontend developer and two people as backend developers. However, both pages have shared functionalities. The bot and data collection appears on both pages; thus, there should be one person in each backend group to take care of the advisor bot, and the other two take care of the data collection.

Tianyang Hu:
 * Strength
    * Have SQL knowledge from CSC343
    * Have past experience for frontend development
    * Have strong basic on OOP languages
 * Weakness
    * Never used Javascript before A1
    * Not good at communication
    * Didn't know how to estimate the progress of a project

Siyang Liu:
 * Strength
    * Have some experience in full stack development.
    * I am easy to get along with 
    * Have self-taught technologies before 
 * Weakness
    * Have not used some technologies required for this project
    * Need more improvement on leading things and making decisions for the team
    * Not too good at negotiating with/rejecting partner

Yuxuan Liu:
 * Strength
    * Have some full-stack experience.
    * Have experience working with customer/partners' demand.
    * Have experience with app design.
 * Weakness
    * New to the tech-stack used in the project.
    * Too hesitate to make decisions.
    * Not knowing too much about other tools (deployment, server) outside the core program.

Yawen Xiao:
 * Strength
    * Have some experience in full stack development.
    * Good at designing and building the user interface.
    * Quick-learner of new language.
 * Weakness
    * Not good at dividing the program into structured files.
    * Do not have enough database experience.
    * Difficult to make decision or give the opinion.

Yicheng Yin:
 * Strength
    * Have some frontend experience with JavaScript, HTML/CSS, React.
    * Have experience with application development.
    * Good leadership, communication and teamwork skills from part time works and volunteer programs.
 * Weakness
    * Do not have Backend programming experience.
    * New to professional fields and do not know the process in professional fields.
    * Always having choice difficulty and need a lot of time to make a decision.

Xin Yao Yu:
 * Strength
    * Have experience working on frontend using HTML, CSS/SCSS, and Vue.js.
    * Good at communication and working as a team.
    * Good at negotiating
 * Weakness
    * Never had backend experience until assignment 1.
    * Lack of experience in application design.
    * Never done deployment before.

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have.
 * Q: When and where? Recurring or ad hoc? In-person or online?

	* We had our first online meeting with our partner on September 29th as an ad hoc meeting.
   * We had our second online meeting with our partner on October 12th as an ad hoc meeting.
   *	For now, before the actual implementation and design of the MVP, our team are planning to have ad hoc meetings when we need to discuss about any confusion on features, any future plan, or anything related to any deliverable that we want to discuss before start the actual development process. These meetings are planned to be held online. There is currently not a specific time or frequency for them since they depend on if we have any confusion about the project.
   *	After we actually start the developing for the MVP, we plan to have a recurring meeting once a week (we might switch it to once every two weeks depending on actual situation). These meeting are planned to be held online for now.
   * We are planning to have a recurring meeting with the partner once every two weeks online. The specific time will be TBD since the partner might move to Cairo next week for a few days, so we would have different time zone, and we would discuss the specific time on the weekend before our meeting since we might not have too fixed availability time.

 * Q: What's the purpose of each meeting?
    *	The first meeting was mainly to introduce ourselves, learn more details about the project from the partner, discuss about the specific expectation that the partner has for our project, negotiate with the partner about what we can provide to him, and settle down plan for future meetings.
    * The second meeting was to ask the partner any questions that we found when we were doing the deliverable1, then show the partner our application design, and ask for feedback, and then answer any question that the partner may have.
   *	The purpose of the ad hoc meetings that we plan to hold before the actual development is to discuss and solve any general confusion we may have about the project and deliverable (these general confusions may include not clear about the detail about a specific feature requirement, wishing to set up more meetings with the partner, wishing to contact the TA)
   *	The purpose of the recurring meeting that we plan to hold after the actual development is to discuss about the technical detail that we need discuss, to update our progress, to assign new tasks to individual team member, discuss the topic that we may need to bring up when meeting with the partner, and to solve any issue that we may encountered together if we can.
   *	The recurring meeting with the partner will be to tell the partner about our progress and discuss any issue that we discovered when we are developing the MVP that we might need to discuss with the partner. 

 * Q: You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * Q: What did you discuss during the meetings?
      *	During the first meeting, our group and the partner introduced each other. The partner introduced his company, how it works, and how this project comes up of his mind to provide us background on this project. We then discussed more specific detail on what the purpose of this project is, what is his expectation about this project and what we can offer him in our MVP. After that, we discussed our future meeting plan. Our team then asked for the partner to provide us a workflow of an important feature that the partner wants us to build
      * During the second meeting, our group firstly asked questions about the things that they think are unclear to us, for example, if the investor will be included as a target user (The answer is no), and the partner promised us to share some personas that his team has for us to refer to. Our group then showed the partner our tech-stack and application design, and we asked the partner to give us any comment or concern he has about them. We then discussed about the data collection and database technologies for this project which the partner cares more about. Our team then asked the partner if he has any further question (he told us that he would go to Cairo for a few days)
   * Q: What were the outcomes of each meeting?
      *	During the first meeting, our team and the partner learned about each other. Our group learned about the partner’s company, and we learned more about what this project is build for and how it is planning to be used. Our group learned what the partner expects the final product to be, and the partner understands more about what our group can offer him, and we have come to an agreement on to what extent this MVP should be built. 
      We also set to an agreement to have online meeting bi-weekly in the future so the partner can check in our progress, and we can ask him any further question. Regarding the workflow that we asked from the partner, we have received that during the following weekend.
      * Our group gets our questions solved by asking them to the partner during the meeting, and the partner showed high satisfaction about our application design, and wanted us to share the design link or screenshot to him so he can showed it to his team to cheer them up (and we have done so). The partner told us more specific demands about data collection, and we came to an agreement on what we can achieve. We discussed the partner's schedule for the next weeks, and learned that he would be in Cairo next week, so we would discuss a better meeting time that works for his timezone during the weekend.
   * Q: You must provide meeting minutes.
      *	<https://docs.google.com/document/d/17TN-Xl904Xk7X4vCk93UpWR7_HItsGQvMl-fz0-EmK4/edit?usp=sharing>
   * Q: You must have a regular meeting schedule established by the second meeting.  
      * The regular meeting schedule is to have a bi-weekly meeting online, the specific time will be determined on the previous weekend through email.
  
#### Q8: What artifacts will you use to self-organize?

* ***Notion***: for making notes on TODOs, tracking progress on each person and dividing jobs.
* ***Wechat***: for daily communication. If there is anything that needs to be rescheduled, we will discuss it here.
* ***Wechat Form***: for meeting schedules.
* ***Zoom***: for actual meetings and during each meeting we will discuss the task for everyone before the next meeting.
* ***WhatsApp&Email***: for communicating with our partner.

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?

To ensure the necessary discussion on the project, we will hold the Zoom meetings online or in-person meetings on the campus. The expected frequency is 2 to 4 hours per week. On the other hand, we can message each other through Discord or WeChat group chat.

When starting a new project, we will first have the meeting, let each member think of the project, and deliver the ideas. Then, by comparing each person’s opinion, we make a complete structure or plan that is the most appropriate and makes everyone agree. If there are any questions or misunderstandings, we will talk during the meeting. When everyone is clear and ready to start, we divide the work into parts. All members get their jobs to do. We will hold meetings every week to demonstrate the progress, ask questions, or connect the work.

**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?

The meeting will hold at a time that everyone can attend. Since we have worked together perfectly before in the CSC207 group project, we are sure that everyone is accountable for attending meetings and completing action items.

**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?

If there is a divarication, the group members will vote for the one they prefer. We will choose the one that most people support or compromise the decisions.
If someone cannot finish the work for some reason, it should make other people know early. So we can reassign the parts.
If someone has problems with the work, it can find help from other members of the TA.

----

## Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections.

#### Decision 1

During the meeting, we gained a more clear view of how our partner's organization work to help startup entrepreneurs and their current demand. They need this app to reduce their work pressure.

Initially, we thought they want a real-time chatting app such that they can answer customer's questions. However, during the meeting, we saw that the app should run automatically to answer quick and common questions of the startups, so that people who do not want to spend time to deeply contact or people who are in rural areas that are unaccessible to the organization can have a chance to get helped.

Therefore, the decision is that we will make a chat bot that follows flowcharts of questions to perform like FAQ, so that it is more accessible and does not need to cost human resources in the organization.

#### Decision 2

The two options given by our partner is a web application or a mobile application.

The advantage of web application is easy accessible as it will be the same url link to access from mobile and from computer. On the other hand, the user might not always have their computer beside, but people will always have their phone. Thus, user could use mobile application anywhere with connections of WiFi. Also, the mobile application could have more features than a website.

In the end, we decided to use web application. The most important goal for our partner is to let more people know about their organization, and
their campaigning event for startup businesses. In this case, easy accessories is more important than complex feature for this application. 
Thus, we chose to build an web application. 

#### Decision 3

During the discussion with our partner, we have made a design decision on the collection of user data.

Our partner will need user information like the location and answers they gave to the bot. In this case, we choose to embed Google Analytics API into our website and add an admin dashboard for viewing and sorting that information. We might also need to change our choice of database to accommodate Google Analytics.

#### Decision 4

Since our bot on the website is based on a prefixed flowchart, we have the decision on how does out partner change the flowchart after we finish the project.

The original thought was to use a JSON file for updating the flowchart. Although JSON file is relatively easy to read for non-technical users, we thought it might be better to design a more straightforward way for that.

In the end, we add a page in the admin dashboard that our partner can modify the flowchart in a more visualized way by clicking buttons and writing in forms.
