export const projectFormater = (p) => {
  return {
    _id: p?._id,
    name: p?.name || "",
    description: p?.description || "",
    tech: p?.tech || [],
    image: p?.image || "",
    createdAt: p?.createdAt || new Date(),
    updatedAt: p?.updatedAt || new Date(),
    source: p?.source || "",
    preview: p?.preview || "",
  };
};

export const userFormater = (u) => {
  return {
    _id: u?._id,
    name: u?.name || "",
    email: u?.email || "",
    createdAt: u?.createdAt || new Date(),
    updatedAt: u?.createdAt || new Date(),
  };
};

export const journeyFormater = (j) => {
  return {
    title: j?.title || "",
    start_date: j?.start_date || "",
    location: j?.location || "",
    end_date: j?.end_date || "",
    type: j?.type || "education",
    _id: j?._id,
    org: j?.org || "",
    org_link: j?.org_link || "",
    description: j?.description || "",
    createdAt: j?.createdAt || new Date(),
    updatedAt: j?.updatedAt || new Date(),
  };
};


export const taskFormater = (t)=>{
  return {
    _id : t?.id ,
    title : t?.title || "",
    content : t?.content || "",
    status : t?.status || "",
    priority : t?.priority || "",
    date : t?.date || new Date(),
    createdAt: t?.createdAt || new Date(),
    updatedAt: t?.updatedAt || new Date(),
  }
}

export const profileFormater = (p)=>{
  return {
    _id: p?._id, 
    email : p?.email ,
    github : p?.github , 
    instagram : p?.instagram ,  
    linkedin : p?.linkedin , 
    location : p?.location , 
    whatsapp : p?.whatsapp , 
    resume : p?.resume , 
  }
}
