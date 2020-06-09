function Student(name, email) {
	let studName = name;
	let studEmail = email;
	let homeworkResults = [];

	this.getName = function() {
		return studName;
	}
	this.getEmail = function() {
		return studEmail;
	}
	this.addHomeworkResult = function(topic, result) {
		homeworkResults.push({
			'topic' : topic,
			'success' : result
		})
	};
	this.getHomeworkResults = function() {
		return homeworkResults;
	}
}

function FrontendLab(students, failedLimit) {
	let failedHomeworksLimit = failedLimit;
	let studentsList = students;
	let homeworkResults = [];

	this.addHomeworkResults = function(list) {
		homeworkResults.push(list);
	}
	this.printStudentsList = function() {

		for (let stud of studentsList) {
			let student = new Student(stud.name, stud.email);
			let studEmail = student.getEmail();

			for (let subject of homeworkResults) {
				let topicName = subject.topic;
				
				for (let item of subject.results) {
					if (item.email === studEmail) {
						student.addHomeworkResult(topicName, item.success);
					}
				}
			}
			console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
			console.log(student.getHomeworkResults());
		}
	}
	this.printStudentsEligibleForTest = function () {
		let failedHomeworks = 0;

		for (let stud of studentsList) {
			let student = new Student(stud.name, stud.email);
			let studEmail = student.getEmail();
			failedHomeworks = 0;

			for (let subject of homeworkResults) {
				
				for (let item of subject.results) {
					if (item.email === studEmail && !item.success) {
						failedHomeworks += 1;
					}
				}
			}
			if (failedHomeworks <= failedHomeworksLimit) {
				console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
			}
		}
	}
}
