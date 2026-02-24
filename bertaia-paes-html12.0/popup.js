function showConfirmationPopup() {
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  popupOverlay.style.position = 'fixed';
  popupOverlay.style.top = 0;
  popupOverlay.style.left = 0;
  popupOverlay.style.width = '100%';
  popupOverlay.style.height = '100%';
  popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  popupOverlay.style.display = 'flex';
  popupOverlay.style.justifyContent = 'center';
  popupOverlay.style.alignItems = 'center';
  popupOverlay.style.zIndex = '9999';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
  popupContent.style.backgroundColor = '#fff';
  popupContent.style.padding = '1.5rem';
  popupContent.style.borderRadius = '10px';
  popupContent.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
  popupContent.style.maxWidth = '320px';
  popupContent.style.width = '100%';
  popupContent.style.textAlign = 'center';
  popupContent.style.position = 'relative';

  const popupTitle = document.createElement('h3');
  popupTitle.textContent = 'Mensagem Enviada!';
  popupTitle.style.marginBottom = '1rem';
  popupTitle.style.fontSize = '1.2rem';
  popupTitle.style.color = '#000';

  const popupMessage = document.createElement('p');
  popupMessage.textContent = 'Sua mensagem foi enviada com sucesso.';
  popupMessage.style.marginBottom = '1.5rem';
  popupMessage.style.fontSize = '1rem';
  popupMessage.style.color = '#000';

  const popupClose = document.createElement('button');
  popupClose.textContent = 'Fechar';
  popupClose.style.padding = '0.5rem 1rem';
  popupClose.style.backgroundColor = '#5a0f0f';
  popupClose.style.color = '#fff';
  popupClose.style.border = 'none';
  popupClose.style.borderRadius = '5px';
  popupClose.style.cursor = 'pointer';

  popupClose.addEventListener('click', closePopup);

  popupContent.appendChild(popupTitle);
  popupContent.appendChild(popupMessage);
  popupContent.appendChild(popupClose);
  popupOverlay.appendChild(popupContent);
  document.body.appendChild(popupOverlay);

  function closePopup() {
    popupOverlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(popupOverlay);
    }, 300);
  }

  popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  setTimeout(() => {
    popupOverlay.classList.add('active');
  }, 10);
}

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch('https://formspree.io/f/xdkzdyzy', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showConfirmationPopup();
          contactForm.reset();
        } else {
          alert('Erro ao enviar. Tente novamente.');
        }
      })
      .catch(() => {
        alert('Erro de rede. Verifique sua conexão.');
      });
    });
  }
});