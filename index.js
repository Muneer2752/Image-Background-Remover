let imageURL;

        function showProcessingMessage() {
            document.getElementById('processingMessage').style.display = 'block';
        }

        function hideProcessingMessage() {
            document.getElementById('processingMessage').style.display = 'none';
        }

        function showDownloadButton() {
            document.getElementById('downloadButton').style.display = 'block';
        }

        function submitHandler() {
            const fileInput = document.getElementById('fileInput');
            const image = fileInput.files[0];

            // Multipart file
            const formData = new FormData();
            formData.append('image_file', image);
            formData.append('size', 'auto');

            const apiKey = 'A1Sqx8Wc4B81kxztK27ujBfg';

            showProcessingMessage();

            fetch('https://api.remove.bg/v1.0/removebg', {
                    method: 'POST',
                    headers: {
                        'X-Api-Key': apiKey
                    },
                    body: formData
                })
                .then(function(response) {
                    return response.blob();
                })
                .then(function(blob) {
                    const url = URL.createObjectURL(blob);
                    imageURL = url;
                    const previewImage = document.getElementById('previewImage');
                    previewImage.innerHTML = '<img src="' + url + '" alt="Preview" class="img-fluid">';
                    previewImage.style.display = 'block';
                    hideProcessingMessage();
                    showDownloadButton();
                })
                .catch(function(error) {
                    console.error(error);
                    hideProcessingMessage();
                });
        }

        function downloadFile() {
            var a = document.createElement('a');
            a.href = imageURL;
            a.download = 'background_removed.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }