function ProfileField(data) {
  this.data = data;
  this.profileFields = {};
}

ProfileField.prototype.profileDetails = () => {
  this.profileFields.user = data.user.id;
  if (this.data.body.handle) this.profileFields.handle = this.data.body.handle;
  if (this.data.body.company)
    this.profileFields.company = this.data.body.company;
  if (this.data.body.website)
    this.profileFields.website = this.data.body.website;
  if (this.data.body.location)
    this.profileFields.location = this.data.body.location;
  if (this.data.body.bio) this.profileFields.bio = this.data.body.bio;
  if (this.data.body.status) this.profileFields.status = this.data.body.status;
  if (this.data.body.githubusername)
    this.profileFields.githubusername = this.data.body.githubusername;
};

ProfileField.prototype.profileSkills = () => {
  if (typeof this.data.body.skills !== "undefined") {
    this.profileFields.skills = this.data.body.skills.split(",");
  }
};

ProfileField.prototype.profileSocial = () => {
  profileFields.social = {};
  if (this.data.body.youtube)
    this.profileFields.social.youtube = this.data.body.youtube;
  if (this.data.body.twitter)
    this.profileFields.social.twitter = this.data.body.twitter;
  if (this.data.body.facebook)
    this.profileFields.social.facebook = this.data.body.facebook;
  if (this.data.body.linkedin)
    this.profileFields.social.linkedin = this.data.body.linkedin;
  if (this.data.body.instagram)
    this.profileFields.social.instagram = this.data.body.instagram;
};
ProfileField.prototype.getProfilefields = () => {
  return this.profileFields;
};

module.exports = ProfileField;
