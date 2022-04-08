# Problem Statement
This project is part of glints technical assessment, in which they want me to develop a full-stack app which reads the `csv`, seeds the data to a database, an api which interacts with the database, and an UI which presents the data in frontend app.

### As per the task documentation:

```

Build a simple user-facing web-app that allows the user to filter for restaurants open by date time as well as restaurant name. On top of that, users can save restaurants into their own named collections (eg. Vegetarian favourites, Meat-lovers etc.).

```

# Technologies Used
- [Nextjs](https://nextjs.org/) -  For Building the Frontend and APIs
- [Tailwindcss](https://tailwindcss.com/) - For UI styling.
- [supabase](https://supabase.com/) - For database.
- [Clerk](https://clerk.dev/) - For Authentication.
- [Vercel](https://vercel.com/) - For hosting the app.

# Implementations
* Developed a custom parser to read the [hours.csv](https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv) file, and prepared the data in a structured manner which can be stored in a database.
* Wrote a custom script to parse the data, and seed the values in the database created in [supabase](https://supabase.com/).
* Then I developed the app UI using [Nextjs](https://nextjs.org/), and implemented APIs as well which is responsible for establishing database connection, query the data, and return them in a structured form, which is being used in the UI for presentation.
* Then integrated [Clerk](https://clerk.dev/) for User authentication. It was needed to distinguish user’s favourite restaurant marking. (In database, user_id is mapped with restaurnat_id in favourites table.)
* Then implemented the toggle button which Marks the selected restaurant as favourite of the session user.
