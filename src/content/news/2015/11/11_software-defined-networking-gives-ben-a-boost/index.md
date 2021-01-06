---
title: "Software Defined Networking gives BEN a boost"
slug: software-defined-networking-gives-ben-a-boost
spotlight: false
publishDate: 2015-11-11
author: 
featuredImage: null
groups:
    - nrig
projects:
    - exogeni
    - panorama
people:
    - ilya-baldin
teams: 
    - 
collaborations:
    - 
tags:
    - ["networking"]
---
<em><a href="http://renci.org/wp-content/uploads/2015/11/BEN-Logo-9-final.jpg"><img class="alignright size-medium wp-image-15190" src="http://renci.org/wp-content/uploads/2015/11/BEN-Logo-9-final-300x157.jpg" alt="BEN Logo 9 final" width="300" height="157" /></a>Breakable Experimental Network (BEN) is now faster and SDN-enabled</em>

CHAPEL HILL, NC, November 10, 2015 - A collaboration between researchers at RENCI and the University of Houston means that RENCI’s <a href="http://renci.org/news/benefits-of-ben/">Breakable Experimental Network</a> (BEN) will be faster and easier to use for scientists with data intensive research problems to solve.

<!--more-->

BEN, an optical network test bed that connects UNC-Chapel Hill, RENCI, Duke University, and North Carolina State University, was developed and deployed by RENCI’s networking research group nearly five years ago as a dark fiber network for experiments in networking technologies. BEN links the campuses to other high-speed research networks, such as <a href="http://www.internet2.edu/">Internet2</a> and the Department of Energy’s <a href="https://www.es.net/">Energy Sciences Network</a> (ESnet) and provides an on ramp to the 20-plus nodes and computational resources of <a href="http://www.exogeni.net/">ExoGENI</a>, a RENCI-led project funded through the National Science Foundation’s <a href="https://www.geni.net/">Global Environment for Network Innovation</a>s (GENI) initiative.

But the BEN of old has undergone a makeover that means more speed and flexibility and access to even more nationwide resources.

Originally deployed to handle network traffic at 10 gigabits per second (Gbps), BEN’s capacity increased to 40 Gbps one year ago—enough bandwidth to download a full-length high definition movie in about two seconds.

More recently, the RENCI research team upgraded BEN to better manage the increased traffic capacity of a 40 Gb network using software defined networking (SDN), which decouples a network’s data plane (the part of the network that forwards data packets) from the control plane (the routing system that gets the data to its destination). To enable SDN, the research team used OpenFlow switches, which, unlike classical network switches, separates these two key functions of a network.

“In software defined networking the whole idea is that the control plane is moved out of the switch,” said Ilya Baldin, director of the RENCI networking research group. “But once you move it out, the control logic that once resided in the switch needs to be somewhere—you need what is called a controller.”

Rather than build their own controller, Baldin’s research team chose to partner with Nicholas Bastin at the University of Houston to deploy an open source controller called Mini-Ankh, which provides circuit services using the OpenFlow protocol. The new controller went through several weeks of testing on BEN, proved to be a good fit, and this week became an official component of the BEN configuration.

Bastin, a research assistant professor of computer engineering technology, described Mini-Ankh as a free version of the commercial Ankh controller that is part of the Enterprise Infrastructure Orchestration Environment (EIOE) developed by Barnstormer Softworks. A general release date and final list of features for the controller, which will likely undergo a name change to Ankh Lite, have not yet been set.

“There is nothing more satisfying than building a technical solution and then seeing it put to good use,” said Bastin. ““An added benefit for our research is that as the controller is tested in more diverse high performance networks, our team learns a lot that we can use in future development efforts to satisfy more research needs."

In addition to more muscle, the upgrade makes BEN a better fit for running data-intensive applications, since SDN can handle larger data transfers and, using the load balancing feature of the controller, allows for customized routing decisions to avoid bottlenecks that can slow down data transfers. Users of the upgraded BEN can still connect to the computing and software resources available through the ExoGENI infrastructure, but by using Mini-Ankh as the controller for SDN, they can also connect to resources beyond the ExoGENI sites.

“This was a collaborative effort to enable more functionality for BEN, but more importantly, it is an enabler of research,” said Chris Heermann, RENCI’s chief network architect. “By turning BEN into an SDN, we can quickly and easily reconfigure it so that researchers with data-intensive problems can easily move their data, connect to the resources they need, and get their results.”

The partnership with the University of Houston could evolve into a continuing collaboration in the use of SDN as BEN’s capabilities are further improved and the RENCI research team works to bump up data transfer speeds to 100 Gbps.

<strong>RENCI networking research at SC15</strong>

RENCI’s networking research group will be at the RENCI booth (#181) at <a href="http://sc15.supercomputing.org/">SC15</a>, the international conference for high performance computing, networking, storage and analysis in Austin, Texas, Nov. 17 – 19. Stop by the booth to learn more about ExoGENI. RENCI networking experts will also present <a href="http://renci.org/research/panorama/">PANORAMA</a>, an approach for modeling and diagnosing the run-time performance of complex scientific workflows, and the Resource Aware Data-centrIc collaboratIon Infrastructure (<a href="http://renci.org/radii/">RADII</a>), a cloud-based platform designed to enable data-centric collaborations. Another demonstration will deploy ExoGENI resources on <a href="https://www.cloudlab.us/">CloudLab</a>, a flexible, scientific infrastructure for research on the future of cloud computing.

RENCI iRODS team, developers of the integrated Rule-Oriented Data System, will also be in the RENCI booth offering demonstrations and information about iRODS and the iRODS Consortium. For a complete list of booth presentations, click <a href="http://renci.org/sc15-renci-booth-schedule/">here</a>.
