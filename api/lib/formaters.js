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


export const taskFormater = (t) => {
  return {
    _id: t?._id,
    title: t?.title || "",
    content: t?.content || "",
    status: t?.status || "",
    priority: t?.priority || "",
    project: t?.project || "",
    date: t?.date || new Date(),
    createdAt: t?.createdAt || new Date(),
    updatedAt: t?.updatedAt || new Date(),
  }
}

export const profileFormater = (p) => {
  return {
    _id: p?._id,
    email: p?.email || "",
    github: p?.github || "",
    instagram: p?.instagram || "",
    linkedin: p?.linkedin || "",
    location: p?.location || "",
    whatsapp: p?.whatsapp || "",
    resume: p?.resume || "",
    createdAt: p?.createdAt || new Date(),
    updatedAt: p?.updatedAt || new Date(),
  }
}


export const freelanceProjectFormater = (p) => {
  const { name, email, phone } = p.client
  return {
    _id: p?._id,
    client: {
      name: name || "",
      email: email || "",
      phone: phone || ""
    },
    project_name: p?.project_name || "",
    status: p?.status || "",
    start_date: p?.start_date || "",
    deadline: p?.deadline || "",
    description: p?.description || "",
    docs: p?.docs || [],
    tasks: p?.tasks || [],
    createdAt: p?.createdAt || new Date(),
    updatedAt: p?.updatedAt || new Date(),
  }
}

export const invoiceFormater = (i) => {
  return {
    _id : i?._id , 
    project: i?.project || null,
    total: i?.total || 0,
    status : i?.status || "Sent",
    currency: i?.currency || "MAD",
    issue_date: i?.issue_date || "",
    due_date: i?.due_date || "",
    items: i?.items || [],
    payments: i?.payments || [],
    createdAt: i?.createdAt || new Date(),
    updatedAt: i?.updatedAt || new Date(),
  } 
}