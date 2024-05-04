# Weekday Assignment

##### This project is a candidate application platform that allows users to view job listings, filter jobs based on various criteria, and implement infinite scroll for a seamless browsing experience. The platform provides a user-friendly interface for viewing and applying to jobs.

---
###### For the scope of this assignment I made the implementation of infinite scroll and handled the filter in the client side by filtering the required cards only. So, after applying filters, when the user scrolls through the feed, they will be getting only the filtered job results populating in the feed from the API response.

---
##### This project is hosted on vercel
##### Live URL - `https://weekday-page.vercel.app/`


## How to run locally

- Clone the repository from github - https://github.com/PratikChakraborty10/weekday-page.git
- Go to the project directory and open terminal in the same directory and install the required node_modules to run the project locally
 ```bash 
npm install
```

- Now run the project - 
```bash
npm run dev
```

### Functionality

- Infinite Scroll
- Filters
- Filter the fresh response based on the selected types

### Code Enhancements
- Used modularised scss modules for styling the components which helps in response helps nesting of CSS rules, improving code readability by visually representing the hierarchy of HTML elements. Additionally, it enhances modularity by organizing styles into encapsulated modules, reducing the likelihood of conflicts and promoting reusability across the project.
- For this project, I leveraged Next.js, a React framework, to build a powerful and efficient web application. Additionally, TypeScript was employed to enhance development workflow by providing static typing and improved code reliability, making the project more maintainable and scalable.