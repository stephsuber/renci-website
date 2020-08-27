# RENCI Website Data Types

- [Types](#types)
- [Examples](#examples)

## Types

### Person

- id: String
- name:
  + first:  String
  + last: String
- photo: String, relative path to image file
- email: String, normal-email@address-form.at
- title: String
- office: 
  - location: String
  - phone: String, XXX-XXX-XXXX
- online_presence:
  - url: String
  - github: String
  - twitter: String
- bio: String

### Research Group

- id: String
- name: String
- description: String
- featuredImage: null
- lead: Person ID
- members: [Person IDs]
- projects: [Project IDs]
- online_presence:
  - url: String
  - github: String
  - twitter: String

### Collaboration

- id: String
- name: String
- description: String
- lead: Person ID
- members: [Person IDs]
- online_presence:
  - url: String
  - github: String
  - twitter: String

### Project

- id: String
- name: String
- description: String
- online_presence:
  - url: String
  - github: String
  - twitter: String

### Team

- id: String
- name: String
- description: String
- lead: Person ID
- members: [Person IDs]

### News Article

- title: String
- slug: String, kebab case for URL, as in renci.org/news/this-is-the-slug
- spotlight: Boolean, should this show in front page news spotlight?
- publish_date: String, YYYY-MM-DD
- author: Person ID
- featuredImage: String, relative path to image file
- groups: [Group IDs]
- projects: [Project IDs]
- people: [Person IDs]
- teams: [Team IDs]
- collaborations: [Collaboration IDs]
- tags: [String]
- text: String

### Career

- title: String
- unc_position_number: String, from UNC
- publish_date: String, YYYY-MM-DD
- active: Boolean, is this posting currently active?
- text: String

## Examples

### Person

```
id: sahalt
name: Stan Ahalt
photo: ahalt-stan.jpg
email: sahalt@renci.org
title: Director
office: 
  location: 123
  phone: 919-123-4567
online_presence:
  twitter_username: tw1tt3rm@st3r
  github_username: 
  url: 
bio: >
    some brief biographical information. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
```

### Research Group

```
id: nrig
name: Networking Research Infrastructure Group
description: >
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
featuredImage: null
lead: ibaldin
members:
  - ibaldin
  - pruth
  - amandal
  - mcevik
  - yxin
  - exin
  - szeng
  - cwong
  - escott
  - kthareja
  - mstealey
projects:
  - chameleon
  - fabric
  - geni
online_presence:
  url: https://nrig.renci.org
  github: null
  twitter: null
```

### Collaboration

```
id: sbdh
name: South Big Data Hub
description: >
    south big data hub details south big data hub details south big data hub details
lead:
  - ssuber
members:
  - ssuber
  - dcarsey
  - ssuber
online_presence:
  url: https://southbigdatahub.org/
  github: 
  twitter: SouthBigDataHub
```

### Project

```
id: chameleon
name: Chameleon
description: this is a brief description of chameleon. this is a brief description of chameleon.
online_presence:
  url: https://www.chameleoncloud.org
  github: chameleoncloud
  twitter:
```

### Team

```
id: communications
name: Communications
description: >
    Brief description of the comms team. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, ipsum!
lead: subers
members:
  - subers
  - marcussamie86
  - mwatson
```

### News Article

```
---
title: Fake Article
slug: fake-article
spotlight: true
publish_date: 2020-06-18
author: mwatson
featuredImage: ./some-image.jpg
groups:
    - nrig
projects:
    - fabric
people:
    - ibaldin
    - subers
teams: 
    - ood
collaborations:
    - biodata-catalyst
tags:
    - networking
---

Actual article text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut inventore nulla laboriosam, dicta corrupti harum commodi. Magnam voluptatibus eligendi quia soluta deserunt, temporibus omnis explicabo alias dolorem, sunt voluptatem inventore.

```

### Career

```
---
title: Domain Scientist in Data Assimilation
unc_position_number: "20012252"
publish_date: 2020-01-17
active: true
---
The Domain Scientist in Data Assimilation will serve as a research scientist at RENCI who works on the mathematical processes underlying the assimilation of data into models. This position will have a particular emphasis on next generation models of sea ice. Other models in climate and public health may be considered as well. 
```

