---
title: "What to expect at the 2018 iRODS User Group Meeting"
slug: what-to-expect-at-the-2018-irods-user-group-meeting
spotlight: false
publishDate: 2018-05-23
author: 
featuredImage: null
groups:
    - 
projects:
    - irods
people:
    - jason-coposky
teams: 
    - 
collaborations:
    - irods-consortium
tags:
    - data-management
    - open-source
---
<em><img class="aligncenter size-large wp-image-17529" src="https://renci.org/wp-content/uploads/2018/05/Screen-Shot-2018-05-23-at-11.10.41-AM-1024x410.png" alt="" width="640" height="256" />Interested in iRODS? Register for the meeting at  </em><a href="http://irods.org/ugm2018"><em>irods.org/ugm2018</em></a>

DURHAM, NC - The worldwide iRODS user community will gather here June 5 – 7 for the iRODS User Group Meeting (UGM), three days of learning, sharing of use cases, and discussions of new capabilities that have been added to the integrated Rule Oriented Data System (iRODS) in the last year. <!--more-->

The meeting will take place at the Durham Convention Center and is sponsored by <a href="http://www.hgst.com/life-sciences">Western Digital</a>, <a href="https://www.quantum.com/customerstories">Quantum</a>, <a href="https://www.ddn.com/">DDN</a>, <a href="https://www.renci.org/">RENCI</a>, and the i<a href="https://irods.org/about/">RODS Consortium</a>, the membership-based foundation that leads development and support of iRODS. Meeting attendees will learn about new features such as storage tiering, automated ingest, and OpenID authentication, according to Jason Coposky, executive director of the iRODS Consortium.

The first version of the iRODS storage tiering framework was released in February and allows iRODS to automatically move data between identified tiers of storage within a configured tiering group based on performance, availability, and data recovery requirements. Using this new framework, users can label selected storage resources with metadata tags to define their place in a storage tiering group as well as how long the data should reside in that tier before migrating to the next tier.

The iRODS automated ingest framework provides an enterprise solution that solves two major data management challenges: putting existing data under management; and ingesting new incoming data from disparate sources. Based on the Python iRODS client and <a href="http://python-rq.org/">Redis Queue</a>, a Python library for queueing and processing jobs, the framework can scale up to meet the demands of data coming off instruments, satellites, or parallel filesystems.

The OpenID authentication plugin allows users to login to iRODS using their existing OpenID credentials. The OpenID system is a method for using a single username and password to sign in to multiple accounts. With the new plugin, iRODS now supports OpenID, GSI, Kerberos, PAM, and native password authentication on a per user basis.

“A lot of our efforts in the last year have focused on improving, streamlining and simplifying the user experience for particular enterprise use cases,” said Coposky.  “We are now using iRODS as the framework to create and ship flexible, off the shelf solutions.”

As always with the annual UGM, users will offer presentations about their organizations’ deployments of iRODS. This year’s meeting will feature 21 talks from users in the U.S. and Europe. Among the use cases and deployments to be featured are:
<ul>
 	<li><strong>Implementing a Storage Abstraction Service with iRODS, </strong><em>Bibliothèque nationale de France (BnF, National Library of France). </em>As part of its efforts to preserve, enrich, and make available the national heritage of France, BnF developed a system called SPAR (Système de Préservation et d'Archivage Réparti) to support and structure its digital preservation efforts. SPAR is now responsible for well over 8 million digital packages, which could be books, musical albums, videos, etc. SPAR uses a Storage Abstraction Service, or SAS, implemented with iRODS. SPAR with iRODS allows easy and transparent duplication of data among remote sites, so that if data is lost, entire documents can be recovered.</li>
 	<li><strong>National Institute for Environmental Health Sciences (NIEHS) Data Commons</strong>, <em>NIEHS, U.S. National Institutes of Health. </em>The NIEHS Data Commons is a system for accessing, sharing, and integrating research data and metadata. An iRODS data grid provides the Commons with policy-based data management to support ingest, indexing, provenance tracking, and analysis of NIEHS data sets. To develop the Commons, NIEHS collaborates with the iRODS Consortium on issues such as the <a href="https://metalnx.github.io/">MetaLnx</a> web interface, message queue-based indexing, metadata templates, and virtual collections.</li>
 	<li><strong>The Brain Image Library</strong>, <em>Pittsburgh Supercomputer Center, Carnegie Mellon University. </em>The Brain Image Library (BIL) is a national public resource in the U.S. enabling researchers to deposit, analyze, mine, share, and interact with large data sets of brain images. It is part of a comprehensive brain cyberinfrastructure initiative by the U.S. National Institutes of Health. The BIL uses iRODS for data registration and metadata management for brain image data sets uploaded to the library. A team at the Pittsburgh Supercomputer Center, which is home to the library, has deployed a prototype iRODS filesystem scanner to rapidly register large multi-terabyte trees of microscopy data into the BIL iRODS database.</li>
 	<li><strong>iRODS for Clinical and Instrument Data Lifecycle Management and Archiving</strong>, <em>Genentech/ Roche Molecular Systems</em>. Genetech, the biotechnology company owned by the Swiss multinational healthcare corporation Roche, will present on their uses of iRODS automated ingest, the storage tiering framework, and data virtualization capabilities. Their use cases for these features include: integration with a large data transfer platform to support data replication; clinical data management to enable easy access to data and to streamline data management; and management of the instrument data lifecycle.</li>
</ul>
<strong>About the iRODS Consortium
</strong>The iRODS Consortium is a membership organization that supports the development of the Integrated Rule-Oriented Data System (iRODS), free open source software for data discovery, workflow automation, secure collaboration, and data virtualization. The iRODS Consortium provides a production-ready iRODS distribution and iRODS training, professional integration services, and support. The world’s top researchers in life sciences, geosciences, and information management use iRODS to control their data. Learn more at <a href="http://irods.org/">irods.org</a>.

The iRODS Consortium is administered by founding member RENCI, a research institute for applications of cyberinfrastructure at the University of North Carolina at Chapel Hill. For more information about RENCI, please visit <a href="https://www.renci.org/">www.renci.org</a>.
