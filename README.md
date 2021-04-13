
## About the assessment

You are going to develop a multi-level todo list. The user should be able to 
-	Add, edit and remove root level tasks
-	Add to-, edit and remove sub-tasks of root level tasks
-	Add to-, edit and remove sub-tasks of any sub task

The above means that one can end up with a tree that can get infinitely deep, therefore it is advisable that you limit the tree depth to 4 or 5 levels.

The system must also notify the user or highlight that certain tasks that are due soon.

### Bonus:
- Use ***Flexbox*** on all layouts in the React.js project
- Use ***scope*** correctly
- Use ***styled components*** in the Web portion
- Use ***template literals*** where applicable
- Ensure you run and test your program often to ensure it is working correctly. You will likely refactor you application as you progress through the tasks.

## Data model

Each task (root or sub-task level) will consist of the following fields

- id: string
- title: string
- status: boolean
- tasks: array of objects
- duedate: string

You may add other fields if you feel its necessary.

## Backend Service

### Requirement

Build a service that will have the functions listed below and expose them as RESTFul endpoints. (The url listed below each function indicates the source to be used in the function). Please use your ***BBD employee number*** as the ***userID***

- ***Add*** a root task  
  - (POST) https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks
  - Body: 
  ```
  {
    title: ''.
    status: boolean,
    dueDate: ''
  }
  ```
- ***Add*** a sub task to a task
  - (POST) https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks/{id}
  - Body:
  ```
  {
    title: ''.
    status: boolean,
    dueDate: ''
  }
  ```  
- ***Get*** all the tasks
  - (GET) https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks
  - Body: ***Not applicable***
- ***Get*** a specific task
  - (GET) https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks/{id}
  - Body: ***Not applicable***
- ***Modify*** a task
  - (PUT)  https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks/{id}
  ```
  {
    title: ''.
    status: boolean,
    tasks: [], ***optional***
    dueDate: ''
  }
  ```
- ***Delete*** a task
  - (DELETE) https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/{userID}/tasks/{id}
  - Body: ***Not applicable***

A base restify service has been created on your behalf in the "svc" folder. "index.js" is the entrypoint. 

### Tasks

- Add middleware to your service. The middleware must execute for all you RESTFul endpoints
  - Automatically log the request URL, and time of invocation for each request. Use the ***Bunyan*** library for logging. Log this information on info level
  - Inject a constant User ID (Your BBDNET number) to each of the requests.
- Implement a RESTFul design. Ensure you are using the correct Verbs, HTTP response codes and URL patterns for each function.
- Your service must implement the Data Model as per the section decribed above. This will define your service contract which your consumer (the web application) will adhere to.
- Ensure that each of the functions deals with exception cases and returns the relevant information to the consumer consuming your endpoints. Ensure you log this information as errors.
- Third party API consumption
  - Use the ***Axios*** library to consume the third party API's
  - All third party calls must use ***blocking*** asynchronous implementations

## Web application

### Building the project base

1. Create a new react app in the ***web*** folder.

2. Your application will consist of a few pages. Add routing capability to your App.js with the following pages. 
- Home page (/)
- Reminders Page (/reminders)
- Edit page (/edit)
- 404 page - Ensure a 404 page is shown when an address (in the address bar of the browser) is used that does not correspond to a page that exists in the application. eg. http://localhost:3000/thispathdoesnotexist

3. Add an image that will always display irrespective of the route.

4. Build the header as a styled-component of which the Font color can be changed using the color prop. Also ensure the component has a default color. Then add a Heading on each of the pages that will display the name of the page the user is on (eg. Home, Reminders etc). Use the default component on all the pages but override the color on the header on the ***HOME*** page

5. Add a menu to allow user to navigate to the pages listed below. The menu must always be shown irrespective of the page you are on.
- Home page
- Reminders page

Bonus: Accentuate the active menu Item (in other words, make the menu item bold, or change the colour of the text if the corresponding page is active.

6. If you have not done so already, ensure that each of your pages is in its own files within your project. 
- Use a ***default*** export for the 404 page. This page must be a ***functional component***
- Use ***named*** exports for Home, Reminders and Edit pages. These pages must be ***Class components***

7. Write a Higher Order Component that will expose a logger as a prop to all your components. 
- A component wrapped inside your HOC should be able to call these functions on the logger prop eg.
  - props.logger.info(msg)
  - props.logger.error(e)
- It can use the standard console for output as we only want to test your ability to write a Higher Order Component and not a logger.
- Use this logger for all tracing throughout your web front end

8. Make sure you provide the user with visual feedback on any errors and any other events that you deem important in your app

### Tasks

#### Home screen

- When the screen loads, Get all the tasks and show them in the home screen by calling the todo service (using the fetch API) you built in an asynchronous ***non blocking*** fashion.
  - Ensure you deal with the exception cases iow, show an error on screen if the call was unsuccessful (Truthy/Falsy check applies)
  - Show a busy indicator whilst the server call is in progress (Truthy/Falsy check applies)
  - Show a 'No tasks' message when there are no tasks rather than an empty screen. (Truthy/Falsy check applies)
- Create a single reusable component that represents a task.
  - Show in some way that a task has sub tasks when relevant. Recommendation is to display the sub-tasks within the parent tasks, but you can also try to show it in an hierarchical way.
  - BONUS: Using styled components allow any instance or set of instances of the task component to have a configurable background color. Example; have the root tasks be a default color of green, have the first level of sub-tasks be red.
  - Use propTypes to define the component contracts using reasonable props, eg color.
- Add a component to the top of the screen where a user can quickly ***add*** a new ***root task***
  - Update the task list automatically when the user adds the task

#### Task component
- Add a ***Add sub-task*** button to your task component
  - Ensure a subtask is added to the database via your service
  - Update the screen when the update is successful
- Add a ***Delete task*** button on your task component
  - Ensure that the specific task is deleted by calling the relevant function you built in your service
  - Update your screen automatically when the task has been deleted successfully
- Add an ***Edit task*** button.
  - Navigate the user to the edit page to edit a particular task using the ID of the task. You must pass the ID of the task using a URL parameter 
  - Pre-populate the page with the task details that is being edited
    -  Update the database via your  service and navigate back to the home page which should show an updated version of the task list.

#### Reminders screen

Add a button somewhere on your homepage that will navigate the user to the ***Reminders page***

- That page needs to show the user all tasks in a list that are due to be completed within 24 hours (based on due date), where the status is ***not in a done state***.
- Allow the user to go back to the home page


