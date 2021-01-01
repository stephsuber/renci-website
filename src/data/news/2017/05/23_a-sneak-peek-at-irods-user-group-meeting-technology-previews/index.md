---
title: "A sneak peek at iRODS User Group Meeting technology previews"
slug: a-sneak-peek-at-irods-user-group-meeting-technology-previews
spotlight: false
publish_date: 2017-05-23
author: 
featuredImage: null
groups:
    - 
projects:
    - irods
people:
    - jason-coposky
    - terrell-russell
teams: 
    - 
collaborations:
    - irods-consortium
tags:
    - ["data management","open source","training"]
---
<em>New plugins to be highlighted; register now at </em><a href="https://irods.org/"><em>irods.org</em></a>

[caption id="attachment_16413" align="aligncenter" width="640"]<a href="http://renci.org/wp-content/uploads/2017/05/27943123275_b4da2bd365_o.jpg"><img class="wp-image-16413 size-large" src="http://renci.org/wp-content/uploads/2017/05/27943123275_b4da2bd365_o-1024x681.jpg" alt="" width="640" height="426" /></a> Above: Terrell Russell speaks at last year's iRODS User Group Meeting.[/caption]

The worldwide iRODS community will gather June 13 – 15 for the first User Group Meeting to be held at Utrecht University in The Netherlands.

Along with use cases and presentations by iRODS users from at least seven countries, the meeting will offer a glimpse at new technologies that will soon be available alongside iRODS 4.2.<!--more-->

“One of the major improvements with iRODS in the last few years has been our ability to build iRODS as a modular platform to which we can easily introduce new plugins independent of major software updates,” said Jason Coposky, executive director of the iRODS Consortium. “We will be talking about some of those soon-to-be available functionalities and what they will mean to iRODS users.”

iRODS—the integrated Rule Oriented Data System—is free open source software for data management and discovery, workflow automation, secure collaboration, and data virtualization. iRODS software is developed and maintained through the support of the iRODS Consortium, a membership organization with industry and academic members worldwide.

Thousands of businesses, research centers, and government agencies located in the U.S., Europe, Asia, Australia, South America, and Africa use iRODS for flexible, policy-based data management that provides long-term preservation and federation.

Technical previews will introduce a number of new capabilities that will soon be available in the iRODS platform. They include:

<strong>Integration with parallel file systems</strong>. Parallel file systems such as Intel’s Lustre and Panasas’ PanFS can move massive amounts of data through high performance computing systems quickly, but putting an iRODS data management layer in the middle of those systems slows down the data transfer process, leaving users with a choice between fast I/O and good data management. A new filesystem integration layer will allow iRODS systems to “see” parallel file systems and translate the parallel changelogs into iRODS events so that the two systems stay in sync. This means that HPC users will be able to manage their data and enforce their data management policies without sacrificing the speed of a parallel file system.

<strong>Multi-part transfer.</strong> The iRODS development team is working to improve the reliability and predictability of large file transfers in iRODS. This effort will allow reliable restarts of data transfers that stop midstream, rather than having to start the transfer process over when it stops or fails. The new multi-part transfer plugin breaks files into chunks that can be transferred simultaneously and then reassembled into a single file once the transfer is complete.

“This is part of our plan to reduce the code complexity of transferring large files,” said iRODS Interim Chief Technologist Terrell Russell. “Parallel multi-part transfer allows for faster data movement, and if a file doesn’t arrive as expected, only the failed or missing parts will need to be retransmitted and verified, rather than the entire file.”

<strong>Metadata templates.</strong> Good data management requires good metadata, and the iRODS development team has developed technology that allows users to create metadata templates that specify their organizations’ naming conventions and vocabulary for metadata and follow other metadata best practices. Providing users with a way to apply consistent metadata naming and enforce a controlled vocabulary will in turn make searches more productive and help users and automated tools find the data they need. Organizations with strict naming conventions will be able to guarantee that high quality, flexible metadata is being entered as well as monitor for compliance after the fact.

<strong>Register now for the UGM and iRODS training</strong>

Registration for the iRODS UGM is still open and seats are filling fast. In addition to the meeting on June 14 and 15, a full-day of iRODS training (beginner and advanced) will be offered on June 13. Participants can register for a training session, the UGM, or both by going to <a href="https://irods.org/ugm2017/">https://irods.org/ugm2017/</a>. The training agenda, pricing, and abstracts for all accepted talks are also available at this site.

For more information on iRODS and the iRODS Consortium, visit <a href="https://irods.org/">irods.org</a>.

For more information on Utrecht University, the host of the 2017 UGM, visit <a href="https://www.uu.nl/en">https://www.uu.nl/en</a>.

<a href="http://renci.org/wp-content/uploads/2017/05/ugm2017_logo_color.jpg">Download the 2017 UGM logo.</a>

<a href="http://renci.org/wp-content/uploads/2016/11/iRODS-Logo.png">Download the iRODS logo.</a>
