import { useState } from "react";
import { Camera, Globe, User } from "lucide-react";

const ProfileSettings = () => {
  const [language, setLanguage] = useState("en");
  const languages = [
    { code: "en", name: "English" },
  ];

  return (
    <div className="p-8 max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-bold text-primary">A</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-smooth">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Form */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input
                    type="text"
                    defaultValue="Alex"
                    className="input-field"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Johnson"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  defaultValue="alex.johnson@email.com"
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Language</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-lg border transition-smooth ${
                  language === lang.code
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2.5 rounded-lg btn-primary font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
