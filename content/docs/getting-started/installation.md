---
title: "Installation"
slug: "installation"
description: "Installing the Maizzle Email Framework on your machine and creating a new project"
---

import Alert from '~/components/Alert.vue'

# Installing Maizzle

## Requirements

Maizzle needs a few tools installed on your machine.

### Node.js

You'll need [Node.js](https://nodejs.org/en/download/) installed. Either download and install the LTS version from the link, or use this command to check if you already have it:

```bash
node -v
```

<alert>Maizzle requires at least Node v10.x.</alert>

### Git

The `maizzle new` command for scaffolding a new project works by cloning a Git repository, so you'll also need to have [Git](https://help.github.com/en/articles/set-up-git#setting-up-git) installed. 

Check if you already have it by running this command:

```bash
git --version
```

## Installation

Maizzle consists of:

- a <abbr title="Command Line Interface">CLI</abbr> tool
- the Framework
- a Starter project

When developing emails on your local machine with Maizzle, you simply run a CLI command inside your Starter project directory. 

That command asks the Framework to build the emails inside your current project, based on config files that it finds in there.

With that in mind:

### Install the CLI

Install the CLI tool globally, so you can use the `maizzle` commands anywhere:

```bash
npm install -g @maizzle/cli
```

### Create a project

```bash
maizzle new
```

This will bring up an interactive prompt which will guide you through the setup:

![maizzle new interactive prompt](https://raw.githubusercontent.com/maizzle/cli/1.0/preview.gif)

Of course, you can also skip the prompt and scaffold a project immediately:

```bash
maizzle new https://github.com/maizzle/maizzle.git
```

Once that's done, change your current directory to the project root: 

```bash
cd maizzle
```

Congratulations, you can now start using Maizzle! 

Start local email development by running the [`serve`](/docs/commands/#serve) command:

```bash
maizzle serve
```

Ready for production?

```bash
maizzle build production
```

Check out the [Commands](/docs/commands/) for more info.
