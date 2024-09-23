import React, { useState } from 'react';

interface ContactProps {
  email: string;
}

const Contact: React.FC<ContactProps> = ({ email }) => {
  const [isEmailVisible, setEmailVisible] = useState(false);

  return (
    <section className="contact">
      <h2>Kontakt</h2>
      <button onClick={() => setEmailVisible(!isEmailVisible)}>
        {isEmailVisible ? 'Hide Email' : 'Show Email'}
      </button>
      {isEmailVisible && <p>{email}</p>}
    </section>
  );
}

export default Contact;
