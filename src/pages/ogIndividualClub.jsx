import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import clubsData from "../data/sampleClubsData.json";
import eventsData from "../data/sampleEventsData.json";

import { BackButton } from "../components/BackButton";

function IndividualClub() {
  const { cid } = useParams(); //retrieves object, keys = url params

  /* replace with data for this single club from db */
  /* same format as json - single object, matching cid as param */
  function getClubById(clubs, cid) {
    return clubs.find(club => club.id == cid) || null;
  }
  const club = getClubById(clubsData, cid);

  // scroll to top on nav
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  })

  /*
    event data - eventsData has an array of json objects; get all event objects where event.cid = cid
    for each event, create a <ClubEventCard event={event} />
    see sampleEventsData.json to see what type of event data is needed
  */

  return (
    <>
    </>
  )
};

export { IndividualClub };