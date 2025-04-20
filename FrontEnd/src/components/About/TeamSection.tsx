import { motion } from "framer-motion";
import {
  Users,
} from "lucide-react";

// Team Section
function TeamSection() {
    const teamMembers = [
      {
        name: "Tejas Raman",
        role: "Frontend Developer",
      },
      {
        name: "Aaroh Nanoti",
        role: "Backend Developer",
      },
      {
        name: "Karthik Yammanur",
        role: "AI Developer",
      },
      {
        name: "Shaheem Jaleel",
        role: "AI Developer",
      },
    ];
  
    return (
      <section id="team" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Meet the Team</h2>
            <p className="mt-4 text-xl text-gray-600">
              The innovative minds behind Arkos
            </p>
          </motion.div>
  
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  function TeamMember({ member, index }: { member: { name: string; role: string; }; index: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-green-200 flex items-center justify-center">
            <Users className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 text-center">
          {member.name}
        </h3>
        <p className="text-green-600*font-medium text-center mb-3">
          {member.role}
        </p>
      </motion.div>
    );
  }

  export default TeamSection;