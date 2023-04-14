(function() {
  const usernameEl = document.querySelector(".username");
	const descriptionEl = document.querySelector(".description");
	const aboutmeEl = document.querySelector(".aboutme");
	const socialEls = [...document.querySelectorAll(".socials a")];
	const projectsEl = document.querySelector(".projects");
	const imageEl = document.querySelector(".user > img");
	
	const socialInd = { "twitter": 0, "discord": 1, "linkedin": 2, "github": 3, "youtube": 4 }
	const socialURL = {
		"twitter": "https://twitter.com/",
		"linkedin": "https://www.linkedin.com/in/",
		"github": "https://github.com/",
		"youtube": "https://www.youtube.com/c/"
	}
	
	socialEls[1].addEventListener("click", () => {
		const oldText = socialEls[1].querySelector("span").textContent;
		
		navigator.clipboard.writeText(oldText);
		socialEls[1].querySelector("span").textContent = "Copied!";
	
		setTimeout(() => {
			socialEls[1].querySelector("span").textContent = oldText;
		}, 1000)
	})
	
	window.addEventListener("message", ev => {
		// Seems to cause unexpected 'No.'s for people who are using the site,
		// so removed.
		// if (ev.origin !== "https://profile-page-generator.justcoding123.repl.co")
		//	return document.write(`<p class="text">No.</p>`);
	
		if (ev.data === "copy") {
			const innerhtml = document.documentElement.innerHTML;
			window.top.postMessage(innerhtml.replace(`<script src="script.js"></script>`, ""), "*");
			return;
		}
	
		try {
			const { username, description, socials, projects, aboutMe, profileImage } = JSON.parse(ev.data);
	
			usernameEl.textContent = username || "Your Name";
			descriptionEl.textContent = description || "Programmer";
			aboutmeEl.innerHTML = aboutMe;

			imageEl.src = profileImage;
	
			for (let [social, name] of Object.entries(socials)) {
				const ind = socialInd[social];
				
				if (!name) socialEls[ind].style.display = "none";
				else socialEls[ind].style.display = "flex";
					
				if (social !== "discord")
					socialEls[ind].href = socialURL[social] + name;
				else {
					socialEls[ind].querySelector("span").textContent = name;
				}
			}
	
			let projecthtml = "";
			for (let project of projects) {
				projecthtml += `<a class="project" href="${project.url}" target="_blank">
		<img src="${project.iconUrl}" alt="${project.title}" class="repl-image">
		<div>
			<span class="repl-name">${project.title || "Repl Not Found"}</span>
			<div class="repl-description">${project.description || ""}</div>
		</div>
	</a>`
			}
			projectsEl.innerHTML = projecthtml;
	
			socialEls[5].href = "https://replit.com/@" + username;
		} catch (err) {
			return document.write(`<span style="color: white;">An error occoured, ${err.message}.</span>`);
		}
	})
})();