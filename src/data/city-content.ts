// Unique per-city content so each page has distinct copy for SEO.
// Keep intros, neighborhoods, and closers authentically different.

export type CityContent = {
  slug: string; // path
  city: string;
  county: 'Broward County' | 'Miami-Dade County' | 'Palm Beach County';
  neighborhoods: string[];
  landmarks: string[];
  nearby: string[]; // adjacent towns
  intro: string; // opening paragraph, city-specific
  vibe: string; // one-line character of the city (used in copy)
  serviceFocus: string; // situations locally common
  closer: string; // final CTA paragraph
  faqExtra?: { q: string; a: string }[];
};

const chip = (s: string) => s;

export const serviceCityContent: Record<string, CityContent> = {
  '/weston/': {
    slug: '/weston/',
    city: 'Weston',
    county: 'Broward County',
    neighborhoods: ['Bonaventure', 'Weston Hills', 'Savanna', 'Windmill Ranch Estates', 'The Ridges'],
    landmarks: ['Weston Regional Park', 'Cleveland Clinic Florida', 'Weston Town Center'],
    nearby: ['Davie', 'Southwest Ranches', 'Sunrise', 'Pembroke Pines'],
    intro:
      "Weston is one of the tidiest, most well-planned cities in South Florida — which is exactly why leftover renovation debris, oversized furniture, or a garage that finally caught up with you can feel so out of place. That's where we come in.",
    vibe: 'suburban, HOA-governed, family-heavy',
    serviceFocus:
      "A lot of our Weston jobs are HOA-conscious cleanouts, garage overhauls, and post-remodel debris. We're careful about pavers, tile driveways, and gated-community access, and we time deliveries and pickups so trailers aren't sitting on the street.",
    closer:
      "Whether you're clearing out a Weston Hills garage before a move, staging a home for sale in Savanna, or wrapping a Bonaventure kitchen remodel, we'll move fast, keep things clean, and give you a fair price up front.",
    faqExtra: [
      { q: 'Can you work around a Weston HOA?', a: 'Yes — most of our Weston jobs involve gated communities and HOAs. Let us know the requirements when you book and we’ll plan trailer placement, delivery timing, and cleanup accordingly.' },
    ],
  },
  '/cooper-city-florida/': {
    slug: '/cooper-city-florida/',
    city: 'Cooper City',
    county: 'Broward County',
    neighborhoods: ['Rock Creek', 'Embassy Lakes', 'Country Address', 'Monterra'],
    landmarks: ['Cooper City Sports Complex', 'Flamingo Road corridor'],
    nearby: ['Davie', 'Pembroke Pines', 'Southwest Ranches'],
    intro:
      'Cooper City has some of the most well-kept homes in Broward, and our job is to make cleanup feel just as tidy. Whether it’s an Embassy Lakes garage overhaul or a Rock Creek estate cleanout, we work fast and leave things spotless.',
    vibe: 'quiet, upscale suburban',
    serviceFocus:
      'Homeowner remodels, estate cleanouts, and yard debris from big lots are the majority of what we haul from Cooper City. HOA-friendly trailer placement is standard.',
    closer:
      "For Cooper City residents who want a straightforward, no-drama removal experience, we're built for that. Text a photo and we'll get you a quick, honest number.",
  },
  '/davie/': {
    slug: '/davie/',
    city: 'Davie',
    county: 'Broward County',
    neighborhoods: ['Forest Ridge', 'Pine Island Ridge', 'Long Lake Ranches', 'Ivanhoe'],
    landmarks: ['Nova Southeastern University', 'Bergeron Rodeo Grounds', 'Robbins Preserve'],
    nearby: ['Cooper City', 'Plantation', 'Weston', 'Fort Lauderdale'],
    intro:
      "Davie is a big, varied town — everything from horse property on the west side to college housing near Nova. That means the jobs are just as varied, and we've done pretty much all of them.",
    vibe: 'town-and-country mix, equestrian pockets, university footprint',
    serviceFocus:
      "Barn and shed cleanouts, ranch-property haul-offs, tenant turnovers near the university, and construction debris from ongoing renovation projects.",
    closer:
      "If you're in Davie and need to move a lot of stuff — or one very awkward thing — we've probably done it before. Send a photo and we'll dial in a quick estimate.",
  },
  '/hollywood/': {
    slug: '/hollywood/',
    city: 'Hollywood',
    county: 'Broward County',
    neighborhoods: ['Emerald Hills', 'Hollywood Lakes', 'Hollywood Beach', 'Oakwood Hills'],
    landmarks: ['Hollywood Beach Broadwalk', 'Hard Rock Guitar Hotel', 'ArtsPark at Young Circle'],
    nearby: ['Dania Beach', 'Hallandale Beach', 'Pembroke Pines', 'Miramar'],
    intro:
      "Hollywood is where beach condos meet older single-family neighborhoods, and both come with their own quirks — narrow alleys, condo restrictions, and lots of moving-in-moving-out cycles. We're used to all of it.",
    vibe: 'coastal, dense, mix of vintage bungalows and high-rise condos',
    serviceFocus:
      "Condo cleanouts, storage-unit haul-offs near Young Circle, tenant turnovers along the Broadwalk area, and heavy Hollywood Lakes renovation debris.",
    closer:
      "Whether it’s a Hollywood Beach studio or an Emerald Hills full-property cleanout, we’ll make it easy and stay flexible on parking and access.",
  },
  '/miramar/': {
    slug: '/miramar/',
    city: 'Miramar',
    county: 'Broward County',
    neighborhoods: ['Silver Lakes', 'Riviera Isles', 'Sunset Falls', 'Historic Miramar'],
    landmarks: ['Miramar Regional Park', 'Miramar Cultural Center'],
    nearby: ['Pembroke Pines', 'Hollywood', 'Miami Gardens', 'Cooper City'],
    intro:
      "Miramar spreads across a huge footprint — from historic Miramar in the east to the newer master-planned communities out west. We serve all of it and know the local delivery routes cold.",
    vibe: 'diverse, master-planned neighborhoods and older established blocks',
    serviceFocus:
      "New-home cleanups, mixed household + construction debris, and residential dump-trailer rentals for weekend projects across Silver Lakes and Riviera Isles.",
    closer:
      "From a single mattress in Historic Miramar to a full renovation load in Riviera Isles, we’ll show up when we say and price it clearly.",
  },
  '/pembroke-pines/': {
    slug: '/pembroke-pines/',
    city: 'Pembroke Pines',
    county: 'Broward County',
    neighborhoods: ['Chapel Trail', 'SilverLakes', 'Pembroke Falls', 'Grand Palms', 'Pembroke Shores'],
    landmarks: ['C.B. Smith Park', 'Pembroke Lakes Mall', 'Pines Boulevard corridor'],
    nearby: ['Miramar', 'Cooper City', 'Weston', 'Hollywood'],
    intro:
      "Pembroke Pines is one of the fastest cities to service — flat street grids, big driveways, and lots of homeowners who like to knock out weekend projects. Our trailers are a natural fit here.",
    vibe: 'family-suburban, wide driveways, HOA neighborhoods',
    serviceFocus:
      "Garage cleanouts, yard debris from big lots, appliance swap-outs, and DIY renovation projects that call for a dump trailer.",
    closer:
      "Text a couple of photos from Pembroke Falls or SilverLakes and we’ll usually have pricing back to you within the hour.",
  },
  '/plantation/': {
    slug: '/plantation/',
    city: 'Plantation',
    county: 'Broward County',
    neighborhoods: ['Plantation Acres', 'Jacaranda', 'Lauderdale West', 'Hawks Landing'],
    landmarks: ['Plantation Central Park', 'Broward Mall', 'University Hospital'],
    nearby: ['Sunrise', 'Davie', 'Fort Lauderdale', 'Lauderhill'],
    intro:
      "Plantation is a mix of established mid-century homes and newer developments — with a lot of long-term homeowners finally tackling deferred projects. That’s where our dump trailers and full-service crews shine.",
    vibe: 'established, tree-lined, mid-century to modern',
    serviceFocus:
      "Kitchen and bath remodels, decades-of-accumulation garage cleanouts, and full estate cleanouts across Jacaranda and Plantation Acres.",
    closer:
      "If you’ve been putting off a Plantation cleanout, this is the sign. One text and we’ll handle it end to end.",
  },
};

export const dumpsterCityContent: Record<string, CityContent> = {
  '/dumpster-rentals-in-cooper-city-florida/': {
    slug: '/dumpster-rentals-in-cooper-city-florida/',
    city: 'Cooper City',
    county: 'Broward County',
    neighborhoods: ['Rock Creek', 'Embassy Lakes', 'Monterra', 'Country Address'],
    landmarks: ['Cooper City Sports Complex'],
    nearby: ['Davie', 'Pembroke Pines', 'Southwest Ranches'],
    intro:
      "Cooper City homeowners love a good weekend project — and our dump trailers are built to keep pavers, driveways, and pristine landscaping safe while you get it done.",
    vibe: 'upscale suburban',
    serviceFocus:
      "Kitchen remodels, garage cleanouts, and yard debris from mature landscaping — trailers sized to match the project, not overkill.",
    closer:
      "Book a Cooper City dump trailer rental and load at your own pace. We’ll drop it, you fill it, we haul it away.",
  },
  '/dumpster-rentals-in-coral-spring-florida/': {
    slug: '/dumpster-rentals-in-coral-spring-florida/',
    city: 'Coral Springs',
    county: 'Broward County',
    neighborhoods: ['Eagle Trace', 'Ramblewood', 'Whispering Woods'],
    landmarks: ['Sawgrass Expressway'],
    nearby: ['Parkland', 'Coconut Creek', 'Tamarac'],
    intro:
      "Coral Springs is our home turf, so dump-trailer delivery here is fast, flexible, and priced right. Weekend renovations, storm cleanup, or a long-overdue garage clear-out — we’ll match the trailer to the job.",
    vibe: 'family suburban',
    serviceFocus:
      "Home renovation debris, hurricane prep and yard cleanup, and multi-day cleanouts.",
    closer:
      "Need a Coral Springs dump trailer this weekend? Text us — we’ll confirm delivery quickly.",
  },
  '/dumpster-rentals-in-davie-florida/': {
    slug: '/dumpster-rentals-in-davie-florida/',
    city: 'Davie',
    county: 'Broward County',
    neighborhoods: ['Forest Ridge', 'Long Lake Ranches', 'Pine Island Ridge'],
    landmarks: ['Nova Southeastern University'],
    nearby: ['Cooper City', 'Plantation', 'Weston'],
    intro:
      "Davie’s bigger lots and equestrian properties mean bigger projects — and often, bigger piles. Our dump trailers handle everything from brush and fencing to full-scale renovation debris.",
    vibe: 'ranch, town-and-country',
    serviceFocus:
      "Barn and shed cleanouts, fence and landscaping tear-outs, and multi-day construction projects.",
    closer:
      "For Davie dump trailer rentals with fair pricing and no fuss, we’re your local option.",
  },
  '/dumpster-rentals-in-ft-lauderdale-florida/': {
    slug: '/dumpster-rentals-in-ft-lauderdale-florida/',
    city: 'Ft. Lauderdale',
    county: 'Broward County',
    neighborhoods: ['Victoria Park', 'Coral Ridge', 'Rio Vista', 'Colee Hammock', 'Las Olas Isles'],
    landmarks: ['Las Olas Boulevard', 'Fort Lauderdale Beach'],
    nearby: ['Wilton Manors', 'Oakland Park', 'Plantation'],
    intro:
      "Fort Lauderdale properties can be tricky — narrow lots, older homes, HOA rules, and tight driveways. We size our dump-trailer deliveries to fit the block and place them carefully every time.",
    vibe: 'urban-coastal, varied neighborhoods',
    serviceFocus:
      "Condo and townhouse renovations, historic-home remodels, and yard debris from storm cleanup along the coast.",
    closer:
      "Book a Fort Lauderdale dump trailer rental and get the space to knock out the project without back-and-forth trips to the transfer station.",
  },
  '/dumpster-rentals-in-hollywood-florida/': {
    slug: '/dumpster-rentals-in-hollywood-florida/',
    city: 'Hollywood',
    county: 'Broward County',
    neighborhoods: ['Emerald Hills', 'Hollywood Lakes', 'Hollywood Beach'],
    landmarks: ['Hollywood Broadwalk'],
    nearby: ['Dania Beach', 'Hallandale Beach'],
    intro:
      "Hollywood ranges from vintage bungalows to modern rebuilds, and dump-trailer rentals here need to be sized right for tight driveways and narrow streets. We’re used to it.",
    vibe: 'coastal-vintage mix',
    serviceFocus:
      "Vintage home renovations, condo turnovers, and multi-day cleanouts near the Broadwalk.",
    closer:
      "For Hollywood dump trailer rentals, expect quick delivery, careful placement, and clear pricing.",
  },
  '/dumpster-rentals-in-miramar-florida/': {
    slug: '/dumpster-rentals-in-miramar-florida/',
    city: 'Miramar',
    county: 'Broward County',
    neighborhoods: ['Silver Lakes', 'Riviera Isles', 'Sunset Falls'],
    landmarks: ['Miramar Regional Park'],
    nearby: ['Pembroke Pines', 'Hollywood', 'Miami Gardens'],
    intro:
      "Miramar’s newer master-planned neighborhoods are great candidates for weekend projects — and our dump trailers make it easy to knock them out in a single stretch.",
    vibe: 'master-planned, family',
    serviceFocus:
      "Move-in cleanups, renovations, and yard-work projects on newer builds.",
    closer:
      "Miramar dump trailer rentals with same-day and next-day availability — text a photo of the site and we’ll take it from there.",
  },
  '/dumpster-rentals-in-pembroke-pines-florida/': {
    slug: '/dumpster-rentals-in-pembroke-pines-florida/',
    city: 'Pembroke Pines',
    county: 'Broward County',
    neighborhoods: ['Chapel Trail', 'SilverLakes', 'Pembroke Falls', 'Pembroke Shores'],
    landmarks: ['C.B. Smith Park', 'Pines Boulevard'],
    nearby: ['Miramar', 'Cooper City', 'Weston'],
    intro:
      "Pembroke Pines driveways are wide and easy to work with — perfect for a dump trailer that stays put until the project is done.",
    vibe: 'family suburban',
    serviceFocus:
      "Kitchen and bath remodels, garage cleanouts, and yard debris from big-lot properties.",
    closer:
      "Pembroke Pines dump trailer rental? We’ll drop it, you fill it, we’ll haul it. Simple.",
  },
  '/dumpster-rentals-in-plantation-florida/': {
    slug: '/dumpster-rentals-in-plantation-florida/',
    city: 'Plantation',
    county: 'Broward County',
    neighborhoods: ['Plantation Acres', 'Jacaranda', 'Hawks Landing'],
    landmarks: ['Plantation Central Park'],
    nearby: ['Sunrise', 'Davie', 'Fort Lauderdale'],
    intro:
      "Plantation homes are often overdue for a good clear-out. Our dump trailers give you the space to actually finish the job — not just kick the problem down the road.",
    vibe: 'established suburban',
    serviceFocus:
      "Long-overdue garage and attic cleanouts, mid-century home renovations, and estate downsizing.",
    closer:
      "Plantation dump trailer rentals with flexible drop-off and pickup windows. Just say when.",
  },
  '/dumpster-rentals-in-southwest-ranches-florida/': {
    slug: '/dumpster-rentals-in-southwest-ranches-florida/',
    city: 'Southwest Ranches',
    county: 'Broward County',
    neighborhoods: ['Sunshine Ranches', 'Rolling Oaks', 'Landmark Ranch Estates'],
    landmarks: ['Frontier Trails', 'Griffin Road corridor'],
    nearby: ['Cooper City', 'Davie', 'Weston'],
    intro:
      "Southwest Ranches has some of Broward’s biggest lots — barns, workshops, guest houses, and horse property. Our dump trailers are built to keep up with those bigger jobs.",
    vibe: 'ranch, semi-rural',
    serviceFocus:
      "Barn cleanouts, land-clearing brush and debris, and multi-week renovation projects.",
    closer:
      "Southwest Ranches dump trailer rental with careful placement on gravel or unpaved driveways — we’re used to it.",
  },
  '/dumpster-rentals-in-sunrise-florida/': {
    slug: '/dumpster-rentals-in-sunrise-florida/',
    city: 'Sunrise',
    county: 'Broward County',
    neighborhoods: ['Sawgrass Lakes', 'Sunrise Lakes', 'Sunrise Golf Village'],
    landmarks: ['Sawgrass Mills'],
    nearby: ['Plantation', 'Tamarac', 'Weston'],
    intro:
      "Sunrise moves fast — tenants in, tenants out, renovations mid-stride. Our dump trailers are made for that pace, delivered quickly and picked up on your schedule.",
    vibe: 'active urban-suburban',
    serviceFocus:
      "Rental turnovers, condo cleanouts, and mid-scale renovations.",
    closer:
      "Sunrise dump trailer rentals delivered fast, priced fair. Text a photo of the drop site — that’s all we usually need.",
  },
  '/dumpster-rentals-in-tamarac-florida/': {
    slug: '/dumpster-rentals-in-tamarac-florida/',
    city: 'Tamarac',
    county: 'Broward County',
    neighborhoods: ['Woodlands', 'Kings Point', 'Mainlands'],
    landmarks: ['Tamarac Sports Complex'],
    nearby: ['Coral Springs', 'North Lauderdale', 'Margate'],
    intro:
      "Tamarac homeowners often use our dump trailers for a slow, careful project — like helping a parent downsize or clearing an inherited property over a few days. We give you the space and time to do it right.",
    vibe: 'quiet suburban, mature community',
    serviceFocus:
      "Downsizing, estate consolidation, and gentle-in-and-out driveway placements.",
    closer:
      "Tamarac dump trailer rental at a fair price, with no rush and no runaround.",
  },
  '/dumpster-rentals-in-weston-florida/': {
    slug: '/dumpster-rentals-in-weston-florida/',
    city: 'Weston',
    county: 'Broward County',
    neighborhoods: ['Weston Hills', 'Bonaventure', 'Savanna', 'The Ridges'],
    landmarks: ['Weston Town Center', 'Cleveland Clinic Florida'],
    nearby: ['Southwest Ranches', 'Davie', 'Sunrise'],
    intro:
      "Weston’s HOAs and premium landscaping mean dump-trailer placement matters. We work carefully around pavers, tile, and irrigation — and we schedule delivery/pickup to keep the trailer off the street.",
    vibe: 'upscale, HOA-governed',
    serviceFocus:
      "Renovation projects, master-bath tear-outs, garage overhauls, and post-storm cleanup.",
    closer:
      "Weston dump trailer rental with driveway-safe delivery. Simple, tidy, on-time.",
  },
};
