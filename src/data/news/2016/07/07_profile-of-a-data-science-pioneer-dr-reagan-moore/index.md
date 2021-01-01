---
title: "Profile of a Data Science Pioneer, Dr. Reagan Moore"
slug: profile-of-a-data-science-pioneer-dr-reagan-moore
spotlight: false
publish_date: 2016-07-07
author: 
featuredImage: null
groups:
    - 
projects:
    - irods
people:
    - stan-ahalt
    - arcot-rajasekar
teams: 
    - 
collaborations:
    - irods-consortium
tags:
    - ["data management","open source"]
---
<em>As he approaches retirement, Reagan Moore reflects on SRB, iRODS, and the ongoing challenge of helping scientists manage their data.</em>

In 1994, Reagan Moore managed the production computing systems at the San Diego Supercomputer Center (SDSC), a job that entailed running and maintaining huge Cray computing systems as well as networking, archival storage, security, job scheduling, and visualization systems.<!--more-->

At the time, research was evolving from analyses done by individuals on single computers into a collaborative activity using distributed, interconnected and heterogeneous resources. With those changes came challenges. As Moore recalls, the software needed to manage data and interactions in a widely distributed environment didn't exist.

[caption id="attachment_3911" align="alignleft" width="640"]<a title="iRODS User Group Meeting 2016" href="https://www.flickr.com/photos/irods/27866207841/in/album-72157669709739022/" data-flickr-embed="true"><img src="https://farm8.staticflickr.com/7369/27866207841_ffaf0b36cf_z.jpg" alt="iRODS User Group Meeting 2016" width="640" height="426" /></a> <script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script> Reagan Moore addresses attendees at the iRODS User Group Meeting, held June 8 and 9, 2016 in Chapel Hill, NC.[/caption]

"The systems at that time were things like AFS (Andrew File System), but it had major restrictions," said Moore. AFS was implemented as modifications to the operating system kernel. To implement AFS for the National Science Foundation's National Partnership for Advanced Computational Infrastructure (NPACI) program, which SDSC managed in the 1990s, required partitioning of user IDs to reserve IDs for each NPACI site.

"Every time you updated a site's kernel you had to reinstall the AFS mods and preserve the user IDs," Moore recalled. "With sites that used different operating systems, this became difficult."

Moore saw the technical challenges as an opportunity for research in distributed data management. He secured funding from the Defense Advanced Research Projects Agency (DARPA), and with a team of talented visionaries and software developers created the Storage Resource Broker (SRB).

<strong>From SRB to iRODS</strong>

Over time, SRB evolved into iRODS, the integrated Rule Oriented Data System and Moore, now a professor in the School of Information and Library Science (SILS) at the University of North Carolina at Chapel Hill and a data scientist at UNC's Renaissance Computing Institute (RENCI), stands on the brink of retirement. iRODS, the middleware platform that started as the SRB, now boasts more than 20,000 end users spanning six continents and manages more than 100 petabytes of data. The iRODS Consortium, established in 2014 to sustain the continued development of iRODS, now includes 17 members as well as four partner organizations that help with iRODS deployments and support services.

It's a software and enabling science success story that developed over two decades and involved much hard work as well as an aggressive goal.

[caption id="attachment_3909" align="alignleft" width="640"]<a title="iRODS User Group Meeting 2016" href="https://www.flickr.com/photos/irods/27866210021/in/album-72157669709739022/" title="iRODS User Group Meeting 2016" data-flickr-embed="true"><img src="https://farm8.staticflickr.com/7313/27866206401_44bc60e1d1_z.jpg" alt="iRODS User Group Meeting 2016" width="640" height="426" /></a> <script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script> Reagan Moore, left, with RENCI Director Stan Ahalt after receiving recognition for long and successful career at the recent iRODS User Group meeting in Chapel Hill, NC.[/caption]

"Reagan is a visionary," said Arcot Rajasekar, who started working with Moore in the mid 1990s and made the move from SDSC to UNC-Chapel Hill with him in 2008. "He was talking about massive data analysis and data intensive computing a full 15 years before the phrase ‘big data' was coined. These days the word ‘policy' in data management, curation, sharing and analysis is becoming mainstream. But Reagan was talking about it a long while back."

Rajasekar, also a professor in UNC's SILS and a RENCI data scientist, was a key member of the original Data Intensive Computing Environments (DICE) research group, the team established to develop the SRB. Other members were system architect Mike Wan, principal developer Wayne Schroeder, and technical manager Chaitan Baru. Over 20 years, the DICE group landed 34 research grants.

"The way we approached the problem was through a very large number of collaborations instead of one large project," Moore remembers. "The research communities provided the requirements; we took their requirements and translated them into generic data management infrastructure."

<strong>Toward rule-oriented data management</strong>

Moore gives credit to Rajasekar for inventing the idea of rule-oriented data management. iRODS developed because SRB users wanted to enforce different constraints for different data collections while using a common infrastructure. Moore remembers working with the data group of the UK's e-Science Program and learning they needed to guarantee files could not be deleted from one data collection. For another collection, they wanted the system administrator to be able to delete and replace bad data, and for a third, they required the collection owner to be able to delete and add data at will.

"What Rajasekar did was to extract the policy that controls the deletion operation from the software and put the rule in a rule base," said Moore. "Then we could make rules appropriate to each collection."

That was the birth of policy-based data management, which allows users to define their own policies and procedures for enforcing management decisions, automating administrative tasks, and validating assessment criteria. As Moore says, "There are three reasons people go to policy-based data management. One is that there are management decisions they need to enforce properly. Another is they are dealing with distributed data at multiple administrative domains on multiple types of software systems. A third is that the collection has grown so large it can no longer be managed at a single site."

Tenacity and dedication to his craft are traits that Moore's longtime colleagues know well. According to Baru, now senior advisor for data science in the National Science Foundation's Computer and Information Science and Engineering (CISE) directorate, Moore sees his job as a mission.

"We used to say that he loved his work and travel so much that he used his airline mileage credits for even more business travel," said Baru. "He was also the master of stretching the travel dollar. He introduced me to that specific parking lot down Pacific Coast Highway in San Diego that had the cheapest daily rate. To this day, I think of that as 'Reagan's lot.'"

<strong>The Future: Virtualized Data Flows and SDN</strong>

With retirement just around the corner, Moore, always humble and soft spoken, acknowledges his role in changing research from a cottage industry into an endeavor focused on distributed, often large-scale collaborative projects.

"We started out trying to virtualize properties of collections. Most of the world wanted to virtualize storage; we wanted to virtualize the data you were putting into the storage so you could manage collection properties independently of the choice of storage technology," he said.

[caption id="attachment_3910" align="alignleft" width="768"]<a data-flickr-embed="true"  href="https://www.flickr.com/photos/irods/27943130245/in/album-72157669709739022/" title="iRODS User Group Meeting 2016"><img src="https://farm8.staticflickr.com/7298/27943130245_c811abb49e_z.jpg" width="640" height="427" alt="iRODS User Group Meeting 2016"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script></a> Reagan Moore, left, is congratulated for his years of service by Jason Coposky, interim executive director of the iRODS Consortium, at the annual iRODS User Group Meeting in June. In the background are Helen Tibbo, a professor in the UNC School of Information and Library Science, and Chaitan Baru, senior advisor for data science in the NSF's CISE directorate.[/caption]

Next came virtualizing workflows that are executed on compute systems, a process that allows iRODS users to name their workflows, apply access controls, re-execute analyses, track provenance, and generally make it easier for someone else to reapply the same analysis on their own data—all essential capabilities for reproducible research. The next step forward in comprehensive data management, said Moore, is virtualizing data flows.

"I want to be able to describe how data moves across the network, what the sources are, what the destinations are, and apply operations on data in flight," he said. "That's what is happening now with the advent of software defined networking. They are putting policies into the network."

In July 2014, it didn't seem likely Moore would have the chance to see the future of policy-based data management or even enjoy his retirement. While on a business trip, he suffered massive heart failure. He was resuscitated three times and spent the next six months facing a major challenge: How to stay away from the work he loves and concentrate on rest and recuperation.

"If I were a cat, I'd be on my fourth life, so now seems to be a good time to retire," he said. Not surprisingly, he has a longstanding hobby to keep him busy. Moore started doing his family genealogy 26 years ago and decided he needed to derive the properties of a complete genealogy in order to know when the project was complete.

"I built a 252,000 person research genealogy, wrote a graph database so I could analyze it, and derived the properties that define when a genealogy is complete. Now I have to start marketing it so other people can take advantage of the results."

Meanwhile the praises for his contributions to science keep coming in.

"Professor Moore is a visionary pioneer in defining and creating distributed digital library infrastructure," said Gary Marchionini, Dean and Cary C. Boshamer Professor at the UNC's SILS. "He is internationally recognized for his work that makes it possible for data scientists and archivists to instantiate data management policies in code that automates preservation activities. The information science community has been strongly influenced by his work over the past quarter century."

Added Robert Chadduck of the NSF's Division of Advanced Cyberinfrastructure, "While I continue to value and be enriched by Reagan's too-many-to-count contributions to technologies and to scientific advances... I also value his shared contributions to understanding the history and perpetuity of all of us as people as documented in his life contributions to the genealogical record embodying his family."

And finally, from Wayne Schroeder, the software engineer who worked with Moore in the original DICE group:

"I enjoyed working for Reagan. I liked his fairness, his no-nonsense approach, his can-do attitude, and of course his brilliant mind. He set up an environment where we were free to creatively design and implement software that was both research itself and of practical use to scientific and archival communities."
